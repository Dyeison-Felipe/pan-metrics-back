import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CitySchema } from "./database/typeorm/schema/city.schema";
import { CityMapper } from "./database/typeorm/repositories/mapper/city-mapper";
import { StateModule } from "@/core/states/infra/state.module";
import { PROVIDERS } from "@/shared/application/constants/providers";
import { CityRepositoryImpl } from "./database/typeorm/repositories/city.repository";
import { CityController } from "./controller/city.controller";
import { CityRepository } from "../domain/repositories/city.repository";
import { SearchCityPaginatedUseCase } from "../application/usecase/search-city-paginated.usecase";

@Module({
  imports: [TypeOrmModule.forFeature([CitySchema]), StateModule],
  controllers: [CityController],
  providers: [
    {
      provide: PROVIDERS.CITY_REPOSITORY,
      useClass: CityRepositoryImpl,
    },
    {
      provide: SearchCityPaginatedUseCase,
      useFactory: (cityRepository: CityRepository) => {
        return new SearchCityPaginatedUseCase(cityRepository);
      },
      inject: [PROVIDERS.CITY_REPOSITORY]
    }
  ],
  exports: [PROVIDERS.CITY_REPOSITORY],
})
export class CityModule {}