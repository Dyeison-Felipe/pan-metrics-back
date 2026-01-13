import { DataSourceOptions } from 'typeorm';
import { EnvConfig } from '../../../application/env-config/env-config';
import { join } from 'path';

export const getDatabaseConfig = (
  configService: EnvConfig,
): DataSourceOptions => ({
  type: 'postgres',
  host: configService.getDbHost(),
  port: +configService.getDbPort(),
  username: configService.getDbUser(),
  password: configService.getDbPassword(),
  database: configService.getDbName(),
  entities: [join(__dirname, '../../../core/**/infra/schema/**.ts')],
  migrations: [join(__dirname, './migrations/**.{ts,js}')],
  migrationsRun: true,
  logging: false,
  synchronize: false,
});
