import { Inject } from '@nestjs/common';
import { UserEntity } from '@/core/user/domain/entities/user.entity';
import type { UserRepository } from '@/core/user/domain/repositories/user.repository';
import { ID_USER_DEFAULT } from '@/shared/application/constants/id-user-default';
import { PROVIDERS } from '@/shared/application/constants/providers';
import { ConflictError } from '@/shared/application/errors/conflict-error';
import type { HashService } from '@/shared/application/hash/hash.service';
import { CreateUserInput } from '@/shared/application/input/users/create-user.input';
import { CreateUserOutput } from '@/shared/application/output/users/create-user.output';
import { UseCase } from '@/shared/application/usecase/usecase';
import { LoggedUserService } from '@/shared/application/logged-user/logged-user.service';

type Input = CreateUserInput;

type Output = CreateUserOutput;

export class CreateUserUseCase implements UseCase<Input, Output> {
  constructor(
    @Inject(PROVIDERS.USER_REPOSITORY)
    private readonly userRepository: UserRepository,
    @Inject(PROVIDERS.HASH_SERVICE)
    private readonly hashService: HashService,
    @Inject(PROVIDERS.LOGGED_USER_SERVICE)
    private readonly loggedUserService: LoggedUserService
  ) {}

  async execute(input: Input): Promise<Output> {

    const loggedUser = this.loggedUserService.getLoggedUser()

    const existUser = await this.userRepository.findByEmail(input.email);

    if (existUser) {
      throw new ConflictError(`E-mail invalido`);
    }

    const hashedPassword = await this.hashService.hash(input.password);

    const userEntity = UserEntity.create({
      ...input,
      password: hashedPassword,
      createdBy: loggedUser.id ?? ID_USER_DEFAULT,
      updatedBy: loggedUser.id ?? ID_USER_DEFAULT,
    });

    const savedUser = await this.userRepository.save(userEntity);

    const output = this.outputUser(savedUser);

    return output;
  }

  outputUser(userEntity: UserEntity): Output {
    const output: Output = {
      id: userEntity.id,
      email: userEntity.email,
      username: userEntity.username,
    };

    return output;
  }
}
