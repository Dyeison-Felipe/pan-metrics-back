import { Module } from '@nestjs/common';
import { EnvConfigModule } from './shared/infra/env-config/env-config.module';
import { DatabaseModule } from './shared/infra/database/typeorm/database.module';
import { HashModule } from './shared/infra/hash/hash.module';
import { AddressModule } from '@core/address/infra/address.module';
import { StateModule } from '@core/states/infra/state.module';
import { CityModule } from '@core/cities/infra/city.module';

@Module({
  imports: [EnvConfigModule, DatabaseModule, HashModule, AddressModule, StateModule, CityModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
