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
  schema: configService.getSchema(),
    extra: {
    options: `-c search_path=${configService.getSchema()}`,
  },
  entities: [
    join(__dirname, '../../../../core/**/infra/database/typeorm/schema/*.{ts,js}'),
    join(__dirname, '../../../../shared/infra/database/typeorm/schema/*.{ts,js}')
  ],
  migrations: [join(__dirname, './migrations/**.{ts,js}')],
  migrationsRun: true,
  logging: false,
  synchronize: false,
});
