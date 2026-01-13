import { Column, CreateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export abstract class BaseSchema {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({ name: 'createdAt', nullable: false, type: 'date'})
  createdAt: Date;

  @UpdateDateColumn({ name: 'updatedAt', nullable: false, type: 'date'})
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deletedAt', nullable: true, type: 'date'})
  deletedAt: Date | null

  @Column({name: 'createdBy', nullable: false, type: 'varchar'})
  createdBy: string;

  @Column({name: 'updatedBy', nullable: false, type: 'varchar'})
  updatedBy: string;

   @Column({name: 'deletedBy', nullable: true, type: 'varchar'})
  deletedBy: string;
}