import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PlanSchema } from "./database/typeorm/schema/plan.schema";
import { PROVIDERS } from "@/shared/application/constants/providers";
import { PlanMapper } from "./database/typeorm/repositories/mapper/plan-mapper";
import { PlanRespositoryImpl } from "./database/typeorm/repositories/plan.repository";

@Module({
  imports: [TypeOrmModule.forFeature([PlanSchema])],
  controllers: [],
  providers: [
    {
      provide: PROVIDERS.PLAN_MAPPER,
      useClass: PlanMapper
    },
    {
      provide: PROVIDERS.PLAN_REPOSITORY,
      useClass: PlanRespositoryImpl
    }
  ],
  exports: [PROVIDERS.PLAN_MAPPER, PROVIDERS.PLAN_REPOSITORY]
})
export class PlanModule {}