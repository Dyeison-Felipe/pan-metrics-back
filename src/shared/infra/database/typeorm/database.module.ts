import { Module, OnModuleInit } from '@nestjs/common';
import { EnvConfigModule } from '../../env-config/env-config.module';
import { EnvConfigService } from '../../env-config/env-config.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PROVIDERS } from '../../../application/constants/providers';
import { join } from 'path';
import { getDatabaseConfig } from './databaseConfig';
import { DataSource } from 'typeorm';
import { getSchema } from './create-test-schema';

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
export class DatabaseModule implements OnModuleInit {
  constructor(private readonly dataSource: DataSource) {}

  async onModuleInit() {
    const schema = getSchema(this.dataSource);

    if (schema !== 'test') {
      await this.dataSource.query('CREATE SCHEMA IF NOT EXISTS test');
      await this.dataSource.query('SET search_path TO test');
      await this.dataSource.runMigrations();
    }
  }
}
