import { PermissionSchema } from '@/core/permission/infra/database/typeorm/schema/permission.schema';
import { PlanSchema } from '@/core/plan/infra/database/typeorm/schema/plan.schema';
import { BaseSchema } from '@/shared/infra/database/typeorm/schema/baseSchema/baseSchema';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity('plan_permission')
export class PlanPermissionSchema extends BaseSchema {
  @ManyToOne(() => PlanSchema, (plan) => plan.planPermission)
  @JoinColumn({ name: 'plan' })
  plan: PlanSchema;

  @ManyToOne(() => PermissionSchema, (permission) => permission.planPermission)
  @JoinColumn({ name: 'permission' })
  permission: PermissionSchema;
}
