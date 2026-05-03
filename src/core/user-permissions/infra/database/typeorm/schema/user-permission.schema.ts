import { PermissionSchema } from '@/core/permissions/infra/database/typeorm/schema/permission.schema';
import { UserSchema } from '@/core/user/infra/database/typeorm/schema/user.schema';
import { BaseSchema } from '@/shared/infra/database/typeorm/schema/baseSchema/baseSchema';
import { Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity('userpermissions')
export class UserPermissionSchema extends BaseSchema {
  @ManyToOne(() => UserSchema, (user) => user.userPermissions, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user' })
  user: UserSchema;

  @ManyToOne(
    () => PermissionSchema,
    (permission) => permission.userPermissions,
    { onDelete: 'CASCADE' },
  )
  @JoinColumn({ name: 'permission' })
  permission: PermissionSchema;
}
