import { Module } from '@nestjs/common';
import { EnvConfigModule } from './shared/infra/env-config/env-config.module';
import { DatabaseModule } from './shared/infra/database/typeorm/database.module';
import { HashModule } from './shared/infra/hash/hash.module';
import { SharedModule } from '@shared/shared.module';
import { AddressModule } from '@core/address/infra/address.module';

@Module({
  imports: [EnvConfigModule, DatabaseModule, HashModule, SharedModule, AddressModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
