import { UserPermissionSchema } from '@/core/user-permissions/infra/database/typeorm/schema/user-permission.schema';
import { BaseSchema } from '@/shared/infra/database/typeorm/schema/baseSchema/baseSchema';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity('permissions')
export class PermissionSchema extends BaseSchema {
  @Column({ name: 'action', nullable: false })
  action: string; // 'read' | 'create' | 'update' | 'delete'

  @Column({ name: 'subject', nullable: false, unique: true })
  subject: string; // 'Product' | 'User' | etc

  @OneToMany(() => UserPermissionSchema, (up) => up.permission)
  userPermissions: UserPermissionSchema[];
}
