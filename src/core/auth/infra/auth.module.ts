import { Global, Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { LoginUseCase } from '../application/usecase/login.usecase';
import { AuthGuard } from './guard/auth.guard';
import { UserModule } from '@/core/user/infra/user.module';
import { HashModule } from '@/shared/infra/hash/hash.module';
import { JwtConfigModule } from '@/shared/infra/jwt/jwt.module';
import { EnvConfigModule } from '@/shared/infra/env-config/env-config.module';
import { JwtService } from '@/shared/application/jwt/jwt.service';
import { UserRepository } from '@/core/user/domain/repositories/user.repository';
import { HashService } from '@/shared/application/hash/hash.service';
import { EnvConfig } from '@/shared/application/env-config/env-config';
import { PROVIDERS } from '@/shared/application/constants/providers';

@Global()
@Module({
  imports: [UserModule, HashModule, JwtConfigModule, EnvConfigModule],
  controllers: [AuthController],
  providers: [
    AuthGuard,
    {
      provide: LoginUseCase,
      useFactory: (
        jwtService: JwtService,
        userRepository: UserRepository,
        hasService: HashService,
        envConfigService: EnvConfig,
      ) => {
        return new LoginUseCase(
          jwtService,
          userRepository,
          hasService,
          envConfigService,
        );
      },
      inject: [
        PROVIDERS.JWT_SERVICE,
        PROVIDERS.USER_REPOSITORY,
        PROVIDERS.HASH_SERVICE,
        PROVIDERS.ENV_CONFIG_SERVICE,
      ],
    },
  ],
})
export class AuthModule {}
