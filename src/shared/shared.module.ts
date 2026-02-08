import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CityEntity } from './domain/entity/city.entity';
import { StateEntity } from './domain/entity/state.entity';
import { PROVIDERS } from './application/constants/providers';
import { StateMapper } from './infra/database/typeorm/repositories/mappers/state-mapper';
import { CityMapper } from './infra/database/typeorm/repositories/mappers/city-mapper';

@Module({
  imports: [TypeOrmModule.forFeature([StateEntity, CityEntity])],
  providers: [
    {
      provide: PROVIDERS.STATE_MAPPER,
      useClass: StateMapper,
    },
    { provide: PROVIDERS.CITY_MAPPER, useClass: CityMapper },
  ],
  exports: [PROVIDERS.STATE_MAPPER, PROVIDERS.CITY_MAPPER],
})
export class SharedModule {}
