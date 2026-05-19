import { CompanySchema } from '@/core/company/infra/database/typeorm/schema/company.schema';
import { PermissionSchema } from '@/core/permissions/infra/database/typeorm/schema/permission.schema';
import { RoleSchema } from '@/core/role/infra/database/typeorm/schema/role.schema';
import { UserPermissionSchema } from '@/core/user-permissions/infra/database/typeorm/schema/user-permission.schema';
import { BaseSchema } from '@/shared/infra/database/typeorm/schema/baseSchema/baseSchema';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

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

  @Column({
    name: 'password_reset_code',
    type: 'varchar',
    nullable: true,
    length: 6,
  })
  passwordResetCode?: string | null;

  @Column({ name: 'expired_at_code', type: 'timestamp', nullable: true })
  expiredAtCode?: Date | null;

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

  @JoinColumn({
    name: 'role',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'fk_user_role',
  })
  @ManyToOne(() => RoleSchema, (role) => role.user)
  role: RoleSchema;

    @JoinColumn({
    name: 'company',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'fk_user_company',
  })
  @ManyToOne(() => CompanySchema, (company) => company.user)
  company: CompanySchema;

  @OneToMany(() => UserPermissionSchema, (up) => up.user)
  userPermissions?: UserPermissionSchema[];

}
