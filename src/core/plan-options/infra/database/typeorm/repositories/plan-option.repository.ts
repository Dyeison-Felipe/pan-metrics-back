import { PlanOptionRepository } from '@/core/plan-options/domain/repositories/plan-option.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { PlanOptionSchema } from '../schema/plan-option.schema';
import { FindOptionsRelations, Repository } from 'typeorm';
import { PlanOption } from '@/core/plan-options/domain/entity/plan-option.entity';
import { PlanOptionRepositoryMapper } from './plan-option.mapper';

export class PlanOptionRepositoryImpl implements PlanOptionRepository {
  constructor(
    @InjectRepository(PlanOptionSchema)
    private readonly planOptionRepository: Repository<PlanOptionSchema>,
  ) {}

  async findAllByPlanId(planId: string): Promise<PlanOption[] | null> {
    const planOptionsSchema = await this.planOptionRepository.find({
      where: { plan: { id: planId } },
      relations: this.getRelations(),
    });

    if (!planOptionsSchema) return null;

    const planOptions = planOptionsSchema.map((planOption) =>
      PlanOptionRepositoryMapper.toEntity(planOption),
    );

    return planOptions;  
  }

  async save(entity: PlanOption): Promise<PlanOption> {
    return await this.planOptionRepository.save(entity);
  }

  async findById(id: string): Promise<PlanOption | null> {
    throw new Error('Method not implemented.');
  }

  async update(entity: PlanOption): Promise<PlanOption> {
    return await this.planOptionRepository.save(entity);
  }

  async delete(id: string): Promise<void> {
    await this.planOptionRepository.softDelete(id);
  }

  private getRelations(): FindOptionsRelations<PlanOptionSchema> {
    return {
      plan: true,
    };
  }
}
