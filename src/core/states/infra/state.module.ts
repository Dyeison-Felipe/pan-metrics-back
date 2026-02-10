import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { StateSchema } from "./database/typeorm/schema/state.schema";
import { PROVIDERS } from "@shared/application/constants/providers";
import { StateMapper } from "./database/typeorm/repositories/mapper/state-mapper";
import { StateRepositoryImpl } from "./database/typeorm/repositories/state.repository";

@Module({
  imports: [TypeOrmModule.forFeature([StateSchema])],
  controllers: [],
  providers: [
    {
      provide: PROVIDERS.STATE_MAPPER,
      useClass: StateMapper,
    },
    {
      provide: PROVIDERS.STATE_REPOSITORY,
      useClass: StateRepositoryImpl,
    }
  ],
  exports: [PROVIDERS.STATE_MAPPER, PROVIDERS.STATE_REPOSITORY],
})
export class StateModule {}