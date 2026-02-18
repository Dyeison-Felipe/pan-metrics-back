import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { EnvConfigModule } from '../env-config/env-config.module';
import { JwtServiceImpl } from './jwt.service';
import { PROVIDERS } from '@shared/application/constants/providers';
import { EnvConfig } from '@shared/application/env-config/env-config';

// @Global()
@Module({
  imports: [
    EnvConfigModule,
    JwtModule.registerAsync({
      global: true,
      imports: [EnvConfigModule],
      useFactory: async (configService: EnvConfig) => ({
        secret: configService.getJwtSecret(),
        signOptions: {
          expiresIn: configService.getJwtExpiresInSeconds(),
        },
      }),
      inject: [PROVIDERS.ENV_CONFIG_SERVICE],
    }),
  ],
  controllers: [],
  providers: [{ provide: PROVIDERS.JWT_SERVICE, useClass: JwtServiceImpl }],
  exports: [PROVIDERS.JWT_SERVICE],
})
export class JwtConfigModule {}
