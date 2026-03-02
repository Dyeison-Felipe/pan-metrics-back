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