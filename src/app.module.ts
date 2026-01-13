import { Module } from '@nestjs/common';
import { EnvConfigModule } from './shared/infra/env-config/env-config.module';
import { DatabaseModule } from './shared/infra/database/typeorm/database.module';
import { UserModule } from './core/user/infra/user.module';

@Module({
  imports: [EnvConfigModule, DatabaseModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
