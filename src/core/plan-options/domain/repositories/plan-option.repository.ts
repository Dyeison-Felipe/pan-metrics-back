import { BaseRepository } from '@/shared/domain/repository/base-repository';
import { PlanOption } from '../entity/plan-option.entity';

export interface PlanOptionRepository extends BaseRepository<PlanOption> {
  findAllByPlanId(planId: string): Promise<PlanOption[] | null>;
}
