import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PlanSchema } from "./database/typeorm/schema/plan.schema";
import { PROVIDERS } from "@/shared/application/constants/providers";
import { PlanRepositoryImpl } from "./database/typeorm/repositories/plan.repository";
import { PlanRepository } from "../domain/repositories/plan.repository";
import { CreatePlanUseCase } from "../application/usecase/create-plan.usecase";
import { PlanController } from "./controllers/plan.controller";
import { UpdatePlanUseCase } from "../application/usecase/update-plan.usecase";
import { FindAllPlanUseCase } from "../application/usecase/find-all-plan.usecase";
import { DeletePlanUseCase } from "../application/usecase/delete.usecase";

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
      inject: [PROVIDERS.PLAN_REPOSITORY]
    },
    {
      provide: UpdatePlanUseCase,
      useFactory: (planRepository: PlanRepository) => {
        return new UpdatePlanUseCase(planRepository);
      },
      inject: [PROVIDERS.PLAN_REPOSITORY]
    },
    {
      provide: FindAllPlanUseCase,
      useFactory: (planRepository: PlanRepository) => {
        return new FindAllPlanUseCase(planRepository);
      },
      inject: [PROVIDERS.PLAN_REPOSITORY]
    },
        {
      provide: DeletePlanUseCase,
      useFactory: (planRepository: PlanRepository) => {
        return new DeletePlanUseCase(planRepository);
      },
      inject: [PROVIDERS.PLAN_REPOSITORY]
    },
  ],
  exports: [PROVIDERS.PLAN_REPOSITORY],
})

export class PlanModule { }