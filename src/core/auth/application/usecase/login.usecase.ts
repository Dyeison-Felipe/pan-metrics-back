import type { UserRepository } from '@core/user/domain/repositories/user.repository';
import { Inject } from '@nestjs/common';
import { AuthConstants } from '@shared/application/constants/auth-constants';
import { PROVIDERS } from '@shared/application/constants/providers';
import { CookieOptions } from '@shared/application/cookies/cookies';
import type { EnvConfig } from '@shared/application/env-config/env-config';
import { UnauthorizedError } from '@shared/application/errors/unauthorized-error';
import type { HashService } from '@shared/application/hash/hash.service';
import { LoginInput } from '@shared/application/input/auth/login.input';
import type { JwtService } from '@shared/application/jwt/jwt.service';
import { LoginOutput } from '@shared/application/output/auth/login.output';
import { UseCase } from '@shared/application/usecase/usecase';

type Input = LoginInput;

type Output = LoginOutput;

export class LoginUseCase implements UseCase<Input, Output> {
  constructor(
    @Inject(PROVIDERS.JWT_SERVICE) private readonly jwtService: JwtService,
    @Inject(PROVIDERS.USER_REPOSITORY)
    private readonly userRepository: UserRepository,
    @Inject(PROVIDERS.HASH_SERVICE) private readonly hashService: HashService,
    @Inject(PROVIDERS.ENV_CONFIG_SERVICE)
    private readonly envConfigService: EnvConfig,
  ) {}

  async execute({
    email,
    password,
    setCookie,
  }: LoginInput): Promise<LoginOutput> {
    const user = await this.userRepository.findByEmail(email);

    if (!user || !user.active) {
      throw new UnauthorizedError(`Usuário ou senha invalido`);
    }

    const comparePassword = this.hashService.compareHash(
      password,
      user.password,
    );

    if (!comparePassword) {
      throw new UnauthorizedError(`Usuário ou senha invalido`);
    }

    const { token } = await this.jwtService.generateJwt(user);

    const jwtExpiresInSeconds = this.envConfigService.getJwtExpiresInSeconds();

    const options: CookieOptions = {
      httpOnly: true,
      maxAge: jwtExpiresInSeconds,
      path: '/',
      domain: this.envConfigService.getCookieDomain(),
      secure: this.envConfigService.getCookieSecure(),
      sameSite: this.envConfigService.getCookieSameSite(),
    };

    setCookie(AuthConstants.tokenName, token, options);

    const output: Output = {
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
      },
      token: token,
    };

    return output;
  }
}
