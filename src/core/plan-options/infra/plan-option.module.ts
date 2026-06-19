import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlanOptionSchema } from './database/typeorm/schema/plan-option.schema';
import { PROVIDERS } from '@/shared/application/constants/providers';
import { PlanOptionRepositoryImpl } from './database/typeorm/repositories/plan-option.repository';

@Module({
  imports: [TypeOrmModule.forFeature([PlanOptionSchema])],
  controllers: [],
  providers: [
    {
      provide: PROVIDERS.PLAN_OPTION_REPOSITORY,
      useClass: PlanOptionRepositoryImpl,
    },
  ],
  exports: [PROVIDERS.PLAN_OPTION_REPOSITORY],
})
export class PlanOptionModule {}
