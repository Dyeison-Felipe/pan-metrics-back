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

  @CreateDateColumn({ name: 'created_at', nullable: false, type: 'date' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', nullable: false, type: 'date' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true, type: 'date' })
  deletedAt: Date | null;

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
}
