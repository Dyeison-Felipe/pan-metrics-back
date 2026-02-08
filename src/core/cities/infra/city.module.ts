import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CitySchema } from "./database/typeorm/schema/city.schema";
import { PROVIDERS } from "@shared/application/constants/providers";
import { CityMapper } from "./database/typeorm/repositories/mapper/city-mapper";
import { StateModule } from "@core/states/infra/state.module";

@Module({
  imports: [TypeOrmModule.forFeature([CitySchema]), StateModule],
  controllers: [],
  providers: [
    {
      provide: PROVIDERS.CITY_MAPPER,
      useClass: CityMapper
    }
  ],
  exports: [PROVIDERS.CITY_MAPPER],
})
export class CityModule {}