import { UserRepository } from '@/core/user/domain/repositories/user.repository';
import { AuthConstants } from '@/shared/application/constants/auth-constants';
import { PROVIDERS } from '@/shared/application/constants/providers';
import { CookieOptions } from '@/shared/application/cookies/cookies';
import { EnvConfig } from '@/shared/application/env-config/env-config';
import { BadRequestError } from '@/shared/application/errors/bad-request-error';
import { JwtService } from '@/shared/application/jwt/jwt.service';
import { UseCase } from '@/shared/application/usecase/usecase';
import { Inject } from '@nestjs/common';

type Input = {
  code: string;
  email: string;
  setCookie: (key: string, value: string, options?: CookieOptions) => void;
};

type Output = {
  token: string
};

export class VerifyCodeUseCase implements UseCase<Input, Output> {
  constructor(
    @Inject(PROVIDERS.USER_REPOSITORY)
    private readonly userRepository: UserRepository,
    @Inject(PROVIDERS.JWT_SERVICE) private readonly jwtService: JwtService,
    @Inject(PROVIDERS.ENV_CONFIG_SERVICE)
    private readonly envConfigService: EnvConfig,
  ) { }

  async execute({ code, email, setCookie }: Input): Promise<Output> {
    const user = await this.userRepository.findByCode(code, email);

    if (!user) {
      throw new BadRequestError(
        `Código incorreto`,
      );
    };

    if (user.passwordResetCode !== code) {
      throw new BadRequestError(
        `Código incorreto`,
      );
    }

    const { token } = await this.jwtService.generateJwt(user, { secret: this.envConfigService.getJwtSecretForgotPassword(), expiresIn: this.envConfigService.getExpiresInSecondsForgotPassword() });

    const jwtExpiresInSeconds = this.envConfigService.getJwtExpiresInSeconds();

    const options: CookieOptions = {
      httpOnly: true,
      maxAge: jwtExpiresInSeconds,
      path: '/',
      domain: this.envConfigService.getCookieDomain(),
      secure: this.envConfigService.getCookieSecure(),
      sameSite: this.envConfigService.getCookieSameSite(),
    };

    setCookie(AuthConstants.tokenForgotPassword, token, options);

    const output: Output = {
      token: token,
    };

    return output;
  }
}
