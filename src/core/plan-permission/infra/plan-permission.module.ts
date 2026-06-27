import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlanPermissionSchema } from './database/typeorm/schema/plan-permission.schema';
import { PROVIDERS } from '@/shared/application/constants/providers';
import { PlanPermissionRepositoryImpl } from './database/typeorm/repositories/plan-permission.repository';
import { PlanPermissionController } from './controller/plan-permission.controller';
import { FindAllPlanAndPermissionsUseCase } from '../application/usecase/find-all-plan-and-permissions.usecase';
import { PlanPermissionRepository } from '../domain/repositories/plan-permission.repository';

@Module({
  imports: [TypeOrmModule.forFeature([PlanPermissionSchema])],
  controllers: [PlanPermissionController],
  providers: [
    {
      provide: FindAllPlanAndPermissionsUseCase,
      useFactory: (planPermissionRepository: PlanPermissionRepository) => {
        return new FindAllPlanAndPermissionsUseCase(planPermissionRepository);
      },
      inject: [PROVIDERS.PLAN_PERMISSION_REPOSITORY]
    },
    {
      provide: PROVIDERS.PLAN_PERMISSION_REPOSITORY,
      useClass: PlanPermissionRepositoryImpl
    }
  ],
  exports: [PROVIDERS.PLAN_PERMISSION_REPOSITORY],
})
export class PlanPermissionModule {}
