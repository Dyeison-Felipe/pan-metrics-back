import { Column, CreateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


export type SchemaBaseProps = Record<string, unknown>;

type Constructor<T> = new (...args: any[]) => T;

export abstract class BaseSchema {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({ name: 'created_at', nullable: false, type: 'date'})
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', nullable: false, type: 'date'})
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true, type: 'date'})
  deletedAt: Date | null

  @Column({name: 'created_by', nullable: false, type: 'varchar'})
  createdBy: string;

  @Column({name: 'updated_by', nullable: false, type: 'varchar'})
  updatedBy: string;

   @Column({name: 'deleted_by', nullable: true, type: 'varchar'})
  deletedBy: string | null;

  static with<T extends BaseSchema>(
    this: Constructor<T>,
    props: Partial<T>,
  ): T {
    const schemaInstance = new this();
    Object.assign(schemaInstance, props);
    return schemaInstance;
  }
}