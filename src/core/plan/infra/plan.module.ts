import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlanSchema } from './database/typeorm/schema/plan.schema';
import { PROVIDERS } from '@/shared/application/constants/providers';
import { PlanMapper } from './database/typeorm/repositories/mapper/plan-mapper';
import { PlanRespositoryImpl } from './database/typeorm/repositories/plan.repository';
import { CreatePlanUseCase } from '../application/usecase/create-plan.usecase';
import { PlanRespository } from '../domain/repositories/plan.repository';
import { LoggedUserService } from '@/shared/application/logged-user/logged-user.service';
import { PlanController } from './controller/plan.controller';
import { UpdatePlanUseCase } from '../application/usecase/update-plan.usecase';

@Module({
  imports: [TypeOrmModule.forFeature([PlanSchema])],
  controllers: [PlanController],
  providers: [
    {
      provide: PROVIDERS.PLAN_MAPPER,
      useClass: PlanMapper,
    },
    {
      provide: PROVIDERS.PLAN_REPOSITORY,
      useClass: PlanRespositoryImpl,
    },
    {
      provide: CreatePlanUseCase,

      useFactory: (
        planRepository: PlanRespository,
        loggedUser: LoggedUserService,
      ) => {
        return new CreatePlanUseCase(planRepository, loggedUser);
      },
      inject: [PROVIDERS.PLAN_REPOSITORY, PROVIDERS.LOGGED_USER_SERVICE],
    },
    {
      provide: UpdatePlanUseCase,
      useFactory: (
        planRepository: PlanRespository,
        loggedUser: LoggedUserService,
      ) => {
        return new UpdatePlanUseCase(planRepository, loggedUser);
      },
      inject: [PROVIDERS.PLAN_REPOSITORY, PROVIDERS.LOGGED_USER_SERVICE],
    },
  ],
  exports: [PROVIDERS.PLAN_MAPPER, PROVIDERS.PLAN_REPOSITORY],
})
export class PlanModule {}
