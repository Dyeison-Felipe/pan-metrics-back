import { PlanOption } from '@/core/plan-options/domain/entity/plan-option.entity';
import { PlanOptionSchema } from '../schema/plan-option.schema';
import { PlanMapper } from '@/core/plan/infra/database/typeorm/repositories/mapper/plan-mapper';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PlanOptionRepositoryMapper {
  static toEntity(schema: PlanOptionSchema): PlanOption {
    return new PlanOption({
      id: schema.id,
      option: schema.option,
      plan: PlanMapper.toEntity(schema.plan),
      auditable: {
        createdAt: schema.createdAt,
        updatedAt: schema.updatedAt,
        deletedAt: schema.deletedAt,
      },
    });
  }

  static toSchema(entity: PlanOption): PlanOptionSchema {
    return PlanOptionSchema.with({
      id: entity.id,
      option: entity.option,
      plan: PlanMapper.toSchema(entity.plan),
      createdAt: entity.auditable?.createdAt,
      updatedAt: entity.auditable?.updatedAt,
      deletedAt: entity.auditable?.deletedAt,
    });
  }
}
