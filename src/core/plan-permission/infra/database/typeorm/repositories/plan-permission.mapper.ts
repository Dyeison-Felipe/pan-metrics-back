import { PlanPermission } from '@/core/plan-permission/domain/entity/plan-permission.entity';
import { PlanPermissionSchema } from '../schema/plan-permission.schema';
import { PlanMapper } from '@/core/plan/infra/database/typeorm/repositories/mapper/plan-mapper';
import { PermissionMappper } from '@/core/permission/infra/database/typeorm/repositories/mapper/permission.mapper';

export class PlanPermissionMapper {
  static toEntity(schema: PlanPermissionSchema): PlanPermission {
    return new PlanPermission({
      id: schema.id,
      permission: PermissionMappper.toEntity(schema.permission),
      plan: PlanMapper.toEntity(schema.plan),
      auditable: {
        createdAt: schema.createdAt,
        updatedAt: schema.updatedAt,
        deletedAt: schema.deletedAt,
      },
    });
  }

  static toSchema(entity: PlanPermission): PlanPermissionSchema {
    return PlanPermissionSchema.with({
      id: entity.id,
      permission: PermissionMappper.toSchema(entity.permission),
      plan: PlanMapper.toSchema(entity.plan),
      createdAt: entity.auditable?.createdAt,
      updatedAt: entity.auditable?.updatedAt,
      deletedAt: entity.auditable?.deletedAt,
    });
  }
}
