import { Module } from '@nestjs/common';
import { EnvConfigModule } from '../../env-config/env-config.module';
import { EnvConfigService } from '../../env-config/env-config.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PROVIDERS } from '../../../application/constants/providers';
import { join } from 'path';
import { getDatabaseConfig } from './databaseConfig';

@Module({
  imports: [
    EnvConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [EnvConfigModule],
      useFactory: (configService: EnvConfigService) =>
        getDatabaseConfig(configService),
      inject: [PROVIDERS.ENV_CONFIG_SERVICE],
    }),
  ],
  providers: [],
  exports: [],
})
export class DatabaseModule {}
