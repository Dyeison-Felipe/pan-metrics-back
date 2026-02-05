import { Module } from '@nestjs/common';
import { EnvConfigModule } from './shared/infra/env-config/env-config.module';
import { DatabaseModule } from './shared/infra/database/typeorm/database.module';
import { HashModule } from './shared/infra/hash/hash.module';

@Module({
  imports: [EnvConfigModule, DatabaseModule, HashModule,],
  controllers: [],
  providers: [],
})
export class AppModule { }
