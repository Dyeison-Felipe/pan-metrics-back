import { CompanySchema } from '@/core/company/infra/database/typeorm/schema/company.schema';
import { UserSchema } from '@/core/user/infra/database/typeorm/schema/user.schema';
import { BaseSchema } from '@/shared/infra/database/typeorm/schema/baseSchema/baseSchema';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity('roles')
export class RoleSchema extends BaseSchema {
  @Column({ name: 'name', type: 'varchar', length: 255, nullable: false })
  name: string;

  @JoinColumn({
    name: 'company',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'fk_role_company',
  })
  @ManyToOne(() => CompanySchema, (company) => company.role)
  company: CompanySchema;

    @JoinColumn({
    name: 'created_by',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'fk_company_created_by',
  })
  @ManyToOne(() => UserSchema, { nullable: false })
  createdBy: UserSchema;

  @Column({ name: 'created_by', type: 'uuid', insert: false, update: false })
  createdById: string;

  @JoinColumn({
    name: 'updated_by',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'fk_company_updated_by',
  })
  @ManyToOne(() => UserSchema, { nullable: false })
  updatedBy: UserSchema;

  @Column({ name: 'updated_by', type: 'uuid', insert: false, update: false })
  updatedById: string;

  @JoinColumn({
    name: 'deleted_by',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'fk_company_deleted_by',
  })
  @ManyToOne(() => UserSchema, { nullable: true })
  deletedBy: UserSchema | null;

  @Column({
    name: 'deleted_by',
    type: 'uuid',
    nullable: true,
    insert: false,
    update: false,
  })
  deletedById: string | null;

  @OneToMany(() => UserSchema, (user) => user.role)
  user: UserSchema[];
}
