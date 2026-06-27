import { PlanPermissionSchema } from '@/core/plan-permission/infra/database/typeorm/schema/plan-permission.schema';
import { UserPermissionSchema } from '@/core/user-permission/infra/database/typeorm/schema/user-permission.schema';
import { BaseSchema } from '@/shared/infra/database/typeorm/schema/baseSchema/baseSchema';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity('permission')
export class PermissionSchema extends BaseSchema {
  @Column({ name: 'action', nullable: false })
  action: string; // 'read' | 'create' | 'update' | 'delete'

  @Column({ name: 'subject', nullable: false})
  subject: string; // 'Product' | 'User' | etc

  @Column({name: 'description', nullable: true})
  description: string;

  @OneToMany(() => UserPermissionSchema, (up) => up.permission)
  userPermissions: UserPermissionSchema[];

  @OneToMany(() => PlanPermissionSchema, (planPermission) => planPermission.permission)
  planPermission: PlanPermissionSchema[]
}
