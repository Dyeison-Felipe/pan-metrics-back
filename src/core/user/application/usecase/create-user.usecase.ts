import { UserEntity } from '@core/user/domain/entities/user.entity';
import type { UserRepository } from '@core/user/domain/repositories/user.repository';
import { Inject } from '@nestjs/common';
import { PROVIDERS } from '@shared/application/constants/providers';
import { ConflictError } from '@shared/application/errors/conflict-error';
import type { HashService } from '@shared/application/hash/hash.service';
import { CreateUserInput } from '@shared/application/input/users/create-user.input';
import { CreateUserOutput } from '@shared/application/output/users/create-user.output';
import { UseCase } from '@shared/application/usecase/usecase';

type Input = CreateUserInput;

type Output = CreateUserOutput;

export class CreateUserUseCase implements UseCase<Input, Output> {
  constructor(
    @Inject(PROVIDERS.USER_REPOSITORY)
    private readonly userRepository: UserRepository,
    @Inject(PROVIDERS.HASH_SERVICE)
    private readonly hashService: HashService,
  ) {}

  async execute(input: Input): Promise<Output> {
    const existUser = await this.userRepository.findByEmail(input.email);

    if (existUser) {
      throw new ConflictError(`E-mail invalido`);
    }

    const hashedPassword = await this.hashService.hash(input.password);

    const userEntity = UserEntity.create({
      ...input,
      password: hashedPassword,
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
