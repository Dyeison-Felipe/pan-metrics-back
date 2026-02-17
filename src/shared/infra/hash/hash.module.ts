import { Module } from '@nestjs/common';
import { EnvConfigModule } from '../env-config/env-config.module';
import { PROVIDERS } from '../../application/constants/providers';
import { HashServiceImpl } from './hash.service';
import { EnvConfigService } from '../env-config/env-config.service';
import { ConfigService } from '@nestjs/config/dist/config.service';

@Module({
  imports: [EnvConfigModule],
  providers: [
    {
      provide: PROVIDERS.HASH_SERVICE,
      useClass: HashServiceImpl,
    },
  ],
  exports: [PROVIDERS.HASH_SERVICE],
})
export class HashModule {}
