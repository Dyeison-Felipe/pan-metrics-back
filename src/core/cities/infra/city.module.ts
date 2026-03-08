import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CitySchema } from "./database/typeorm/schema/city.schema";
import { CityMapper } from "./database/typeorm/repositories/mapper/city-mapper";
import { StateModule } from "@/core/states/infra/state.module";
import { PROVIDERS } from "@/shared/application/constants/providers";
import { CityRepositoryImpl } from "./database/typeorm/repositories/city.repository";

@Module({
  imports: [TypeOrmModule.forFeature([CitySchema]), StateModule],
  controllers: [],
  providers: [
    {
      provide: PROVIDERS.CITY_MAPPER,
      useClass: CityMapper
    },
    {
      provide: PROVIDERS.CITY_REPOSITORY,
      useClass: CityRepositoryImpl,
    }
  ],
  exports: [PROVIDERS.CITY_MAPPER, PROVIDERS.CITY_REPOSITORY],
})
export class CityModule {}