import { UserSchema } from '@/core/user/infra/database/typeorm/schema/user.schema';
import { BaseSchema } from '@/shared/infra/database/typeorm/schema/baseSchema/baseSchema';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  UpdateDateColumn,
} from 'typeorm';

@Entity('plan')
export class PlanSchema extends BaseSchema {
  @Column({ name: 'name', nullable: false, type: 'varchar', length: 255 })
  name: string;

  @Column({
    name: 'description',
    nullable: false,
    type: 'varchar',
    length: 255,
  })
  description: string;

  @Column({
    name: 'price',
    nullable: false,
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  price: number;

  @Column({ name: 'duration', nullable: false, type: 'varchar', length: 255 })
  duration: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: 'now()',
    nullable: false,
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    default: 'now()',
    nullable: false,
  })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp', nullable: true })
  deletedAt: Date | null;

  @JoinColumn({
    name: 'created_by',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'fk_plan_created_by',
  })
  @ManyToOne(() => UserSchema, { nullable: false })
  createdBy: UserSchema;

  @JoinColumn({
    name: 'updated_by',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'fk_plan_updated_by',
  })
  @ManyToOne(() => UserSchema, { nullable: false })
  updatedBy: UserSchema;

  @JoinColumn({
    name: 'deleted_by',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'fk_plan_deleted_by',
  })
  @ManyToOne(() => UserSchema, { nullable: true })
  deletedBy: UserSchema | null;
}
