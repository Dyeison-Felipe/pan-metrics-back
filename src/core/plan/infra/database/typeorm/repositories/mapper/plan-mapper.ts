import { RepositoryMapper } from '@/shared/infra/database/typeorm/repositories/base-mapper/repository-mapper';
import { PlanSchema } from '../../schema/plan.schema';
import { PlanEntity } from '@/core/plan/domain/entity/plan.entity';
import { Injectable } from '@nestjs/common';
import { UserSchema } from '@/core/user/infra/database/typeorm/schema/user.schema';

@Injectable()
export class PlanMapper implements RepositoryMapper<PlanSchema, PlanEntity> {
  toEntity(schema: PlanSchema): PlanEntity {
    return new PlanEntity({
      id: schema.id,
      name: schema.name,
      description: schema.description,
      duration: schema.duration,
      price: schema.price,
      auditable: {
        createdAt: schema.createdAt,
        updatedAt: schema.updatedAt,
        deletedAt: schema.deletedAt,
        createdBy: schema.createdBy?.id,
        updatedBy: schema.updatedBy?.id,
        deletedBy: schema.deletedBy?.id,
      },
    });
  }
  toSchema(entity: PlanEntity): PlanSchema {
    return PlanSchema.with({
      id: entity.id,
      name: entity.name,
      description: entity.description,
      duration: entity.duration,
      price: entity.price,
      createdAt: entity.auditable.createdAt,
      updatedAt: entity.auditable.updatedAt,
      deletedAt: entity.auditable.deletedAt,
      createdBy: UserSchema.from({ id: entity.auditable.createdBy }),
      updatedBy: UserSchema.from({ id: entity.auditable.updatedBy }),
      deletedBy: entity.auditable.deletedBy
        ? UserSchema.from({ id: entity.auditable.deletedBy })
        : null,
    });
  }
}
