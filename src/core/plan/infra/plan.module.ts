import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PlanSchema } from "./database/typeorm/schema/plan.schema";
import { PROVIDERS } from "@/shared/application/constants/providers";
import { PlanRepositoryImpl } from "./database/typeorm/repositories/plan.repository";
import { PlanRepository } from "../domain/repositories/plan.repository";
import { CreatePlanUseCase } from "../application/usecase/create-plan.usecase";
import { PlanController } from "./controllers/plan.controller";

@Module({
  imports: [TypeOrmModule.forFeature([PlanSchema])],
  controllers: [PlanController],
  providers: [
    {
      provide: PROVIDERS.PLAN_REPOSITORY,
      useClass: PlanRepositoryImpl
    },
    {
      provide: CreatePlanUseCase,
      useFactory: (planRepository: PlanRepository) => {
        return new CreatePlanUseCase(planRepository);
      },
      inject: []
    },
  ],
  exports: [PROVIDERS.PLAN_REPOSITORY],
})

export class PlanModule { }