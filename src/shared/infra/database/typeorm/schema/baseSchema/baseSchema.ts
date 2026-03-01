// baseSchema.ts
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export type SchemaBaseProps = Record<string, unknown>;
type Constructor<T> = new (...args: any[]) => T;

export abstract class BaseSchema {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({ name: 'created_at', nullable: false, type: 'date' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', nullable: false, type: 'date' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true, type: 'date' })
  deletedAt: Date | null;

  @ManyToOne('UserSchema', { nullable: true })  // string, sem import!
  @JoinColumn({ name: 'created_by' })
  createdBy: any | null;

  @ManyToOne('UserSchema', { nullable: true })
  @JoinColumn({ name: 'updated_by' })
  updatedBy: any | null;

  @ManyToOne('UserSchema', { nullable: true })
  @JoinColumn({ name: 'deleted_by' })
  deletedBy: any | null;

  static with<T extends BaseSchema>(this: Constructor<T>, props: Partial<T>): T {
    const schemaInstance = new this();
    Object.assign(schemaInstance, props);
    return schemaInstance;
  }

  static from<T extends BaseSchema>(this: Constructor<T>, props?: Partial<T>): T {
    const schemaInstance = new this();
    if (props) Object.assign(schemaInstance, props);
    return schemaInstance;
  }
}