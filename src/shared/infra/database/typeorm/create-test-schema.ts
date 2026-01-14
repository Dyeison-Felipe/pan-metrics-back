// src/infra/database/get-schema.ts
import { DataSource } from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

export function getSchema(dataSource: DataSource): string | null {
  const options = dataSource.options as PostgresConnectionOptions;
  return options.schema ?? null;
}
