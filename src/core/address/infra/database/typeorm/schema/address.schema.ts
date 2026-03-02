import { BaseSchema } from '@shared/infra/database/typeorm/schema/baseSchema/baseSchema';
import { CitySchema } from '@core/cities/infra/database/typeorm/schema/city.schema';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  UpdateDateColumn,
} from 'typeorm';
import { UserSchema } from '@core/user/infra/database/typeorm/schema/user.schema';

@Entity('addresses')
export class AddressSchema extends BaseSchema {
  @Column({ name: 'cep', type: 'varchar', nullable: false, length: 8 })
  cep: string;

  @Column({ name: 'neighborhood', nullable: false, length: 255 })
  neighborhood: string;

  @Column({ name: 'street', nullable: false, length: 255 })
  street: string;

  @Column({ name: 'number', nullable: false, length: 10 })
  number: string;

  @Column({ name: 'complement', nullable: true, length: 255 })
  complement: string;

  @Column({
    name: 'latitude',
    nullable: true,
    type: 'decimal',
    precision: 10,
    scale: 7,
  })
  latitude: number;

  @Column({
    name: 'longitude',
    nullable: true,
    type: 'decimal',
    precision: 10,
    scale: 7,
  })
  longitude: number;

  @JoinColumn({
    name: 'city',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'fk_addresses_city_id',
  })
  @ManyToOne(() => CitySchema, (city) => city.addresses, { nullable: false })
  city: CitySchema;

  @CreateDateColumn({ name: 'created_at', nullable: false, type: 'date' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', nullable: false, type: 'date' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true, type: 'date' })
  deletedAt: Date | null;

  @JoinColumn({
    name: 'created_by',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'fk_addresses_created_by',
  })
  @ManyToOne(() => UserSchema, { nullable: false })
  createdBy: UserSchema;

  @JoinColumn({
    name: 'updated_by',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'fk_addresses_updated_by',
  })
  @ManyToOne(() => UserSchema, { nullable: true })
  updatedBy: UserSchema;

  @JoinColumn({
    name: 'deleted_by',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'fk_addresses_deleted_by',
  })
  @ManyToOne(() => UserSchema, { nullable: true })
  deletedBy: UserSchema | null;
}
