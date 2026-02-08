import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { StateSchema } from "./database/typeorm/schema/state.schema";
import { PROVIDERS } from "@shared/application/constants/providers";
import { StateMapper } from "./database/typeorm/repositories/mapper/state-mapper";

@Module({
  imports: [TypeOrmModule.forFeature([StateSchema])],
  controllers: [],
  providers: [
    {
      provide: PROVIDERS.STATE_MAPPER,
      useClass: StateMapper,
    },
  ],
  exports: [PROVIDERS.STATE_MAPPER],
})
export class StateModule {}