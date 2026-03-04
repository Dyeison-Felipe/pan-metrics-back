import { PlanRespository } from '@core/plan/domain/repositories/plan.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { PlanSchema } from '../schema/plan.schema';
import { Repository } from 'typeorm';
import { PlanEntity } from '@core/plan/domain/entity/plan.entity';
import { Inject } from '@nestjs/common';
import { PROVIDERS } from '@shared/application/constants/providers';
import { PlanMapper } from './mapper/plan-mapper';

export class PlanRespositoryImpl implements PlanRespository {
  constructor(
    @InjectRepository(PlanSchema)
    private readonly planRepository: Repository<PlanSchema>,
    @Inject(PROVIDERS.PLAN_MAPPER) private readonly planMapper: PlanMapper,
  ) {}

  async save(entity: PlanEntity): Promise<PlanEntity> {
    const planSchema = this.planMapper.toSchema(entity);

    const savePlan = await this.planRepository.save(planSchema);

    const planEntity = this.planMapper.toEntity(savePlan);

    return planEntity;
  }

  async findById(id: string): Promise<PlanEntity | null> {
    const planSchema = await this.planRepository.findOne({
      where: {id},
    })

    if(!planSchema) return null;

    const planEntity = this.planMapper.toEntity(planSchema);

    return planEntity;
    
  }

  async update(entity: PlanEntity): Promise<PlanEntity> {
    const planSchema = this.planMapper.toSchema(entity);

    const savePlan = await this.planRepository.save(planSchema);

    const planEntity = this.planMapper.toEntity(savePlan);

    return planEntity;
  }

  async delete(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
