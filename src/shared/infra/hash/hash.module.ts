import { Module } from '@nestjs/common';
import { EnvConfigModule } from '../env-config/env-config.module';
import { PROVIDERS } from '../../application/constants/providers';
import { HashService } from './hash.service';
import { EnvConfigService } from '../env-config/env-config.service';
import { ConfigService } from '@nestjs/config/dist/config.service';

@Module({
  imports: [EnvConfigModule],
  providers: [
    {
      provide: PROVIDERS.HASH_SERVICE,
      useFactory: (configService: EnvConfigService) => {
        return new HashService(configService);
      },
      inject: [PROVIDERS.ENV_CONFIG_SERVICE],
    },
  ],
  exports: [PROVIDERS.HASH_SERVICE],
})
export class HashModule {}
