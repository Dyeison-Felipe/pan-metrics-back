import { Inject } from '@nestjs/common';
import type { UserRepository } from '@/core/user/domain/repositories/user.repository';
import { PROVIDERS } from '@/shared/application/constants/providers';
import type { HashService } from '@/shared/application/hash/hash.service';
import { UseCase } from '@/shared/application/usecase/usecase';
import { LoggedUserService } from '@/shared/application/logged-user/logged-user.service';
import { BadRequestError } from '@/shared/application/errors/bad-request-error';
import { Transactional } from '@/shared/infra/database/typeorm/decorators/transactional.decorator';
import { JwtService } from '@/shared/application/jwt/jwt.service';

type Input = {
  password: string;
  jwt: string;
};

type Output = void;

export class UpdateUserPasswordUseCase implements UseCase<Input, Output> {
  constructor(
    @Inject(PROVIDERS.USER_REPOSITORY)
    private readonly userRepository: UserRepository,
    @Inject(PROVIDERS.LOGGED_USER_SERVICE)
    private readonly loggedUserService: LoggedUserService,
    @Inject(PROVIDERS.JWT_SERVICE) private readonly jwtService: JwtService,
    @Inject(PROVIDERS.HASH_SERVICE)
    private readonly hashService: HashService,
  ) {}

  @Transactional()
  async execute({ jwt, password }: Input): Promise<Output> {
    const loggedUser = this.loggedUserService.getLoggedUser();

    const isValidJwt = await this.jwtService.verifyJwt(jwt);

    const { sub } = this.jwtService.decodeJwt(jwt);

    const user = await this.userRepository.findById(sub);

    if (!user || !isValidJwt) {
      throw new BadRequestError(`Ocorreu um erro, tente novamente mais tarde`);
    }

    const hashNewPassword = await this.hashService.hash(password);

    user.updatePassword(hashNewPassword);
    user.updateRecoverPasswordJwt();

    await this.userRepository.update(user);
  }
}
