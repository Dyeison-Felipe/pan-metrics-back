import { PermissionSchema } from '@/core/permissions/infra/database/typeorm/schema/permission.schema';
import { UserPermissionSchema } from '@/core/user-permissions/infra/database/typeorm/schema/user-permission.schema';
import { BaseSchema } from '@/shared/infra/database/typeorm/schema/baseSchema/baseSchema';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class UserSchema extends BaseSchema {
  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @Column()
  active: boolean;

  @Column({name: 'recover_password_jwt', type: 'text', nullable: true})
  recoverPasswordJwt?: string;

  @JoinColumn({
    name: 'created_by',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'fk_user_created_by',
  })
  @ManyToOne(() => UserSchema, { nullable: true })
  createdBy: UserSchema | null;

  @JoinColumn({
    name: 'updated_by',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'fk_user_updated_by',
  })
  @ManyToOne(() => UserSchema, { nullable: true })
  updatedBy: UserSchema | null;

  @JoinColumn({
    name: 'deleted_by',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'fk_user_deleted_by',
  })
  @ManyToOne(() => UserSchema, { nullable: true })
  deletedBy: UserSchema | null;

  @OneToMany(() => UserPermissionSchema, (up) => up.user)
  userPermissions: UserPermissionSchema[];
}
