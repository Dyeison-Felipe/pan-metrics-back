import { Module } from '@nestjs/common';
import { EnvConfigModule } from './shared/infra/env-config/env-config.module';
import { DatabaseModule } from './shared/infra/database/typeorm/database.module';
import { UserModule } from './core/user/infra/user.module';
import { HashModule } from './shared/infra/hash/hash.module';
import { RoleModule } from './core/role/infra/role.module';

@Module({
  imports: [EnvConfigModule, DatabaseModule, UserModule, HashModule, RoleModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
