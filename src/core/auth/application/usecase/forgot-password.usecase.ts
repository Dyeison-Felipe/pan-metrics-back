import { UserRepository } from "@/core/user/domain/repositories/user.repository";
import { AuthConstants } from "@/shared/application/constants/auth-constants";
import { PROVIDERS } from "@/shared/application/constants/providers";
import { CookieOptions } from "@/shared/application/cookies/cookies";
import { EnvConfig } from "@/shared/application/env-config/env-config";
import { BadRequestError } from "@/shared/application/errors/bad-request-error";
import { UnauthorizedError } from "@/shared/application/errors/unauthorized-error";
import { HashService } from "@/shared/application/hash/hash.service";
import { LoginInput } from "@/shared/application/input/auth/login.input";
import { JwtService } from "@/shared/application/jwt/jwt.service";
import { MailService } from "@/shared/application/mail/mail.service";
import { LoginOutput } from "@/shared/application/output/auth/login.output";
import { UseCase } from "@/shared/application/usecase/usecase";
import { Transactional } from "@/shared/infra/database/typeorm/decorators/transactional.decorator";
import { Inject } from "@nestjs/common";
import { randomInt } from "crypto";

type Input = {
  email: string
};

type Output = void;

export class LoginUseCase implements UseCase<Input, Output> {
  constructor(
    @Inject(PROVIDERS.JWT_SERVICE) private readonly jwtService: JwtService,
    @Inject(PROVIDERS.USER_REPOSITORY)
    private readonly userRepository: UserRepository,
    @Inject(PROVIDERS.HASH_SERVICE) private readonly hashService: HashService,
    @Inject(PROVIDERS.ENV_CONFIG_SERVICE)
    private readonly envConfigService: EnvConfig,

    @Inject(PROVIDERS.MAIL_SERVICE) private readonly mailService: MailService
  ) { }

  @Transactional()
  async execute({
    email,
  }: Input): Promise<Output> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new UnauthorizedError(`Se este email estiver cadastrado, você receberá o código em breve.`);
    }

    try {
      const code = randomInt(100000, 999999).toString();
      await this.mailService.sendMail({ to: user.email, template: 'forgot-password', subject: 'Código de recuperação de senha' });
      user.updateResetPasswordCode(code);
      await this.userRepository.update(user);
    } catch (error) {
      throw new BadRequestError(`Se este email estiver cadastrado, você receberá o código em breve.`)
    }


  }
}
