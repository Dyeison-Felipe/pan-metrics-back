import { CitySchema } from '@/core/cities/infra/database/typeorm/schema/city.schema';
import { CompanySchema } from '@/core/company/infra/database/typeorm/schema/company.schema';
import { UserSchema } from '@/core/user/infra/database/typeorm/schema/user.schema';
import { BaseSchema } from '@/shared/infra/database/typeorm/schema/baseSchema/baseSchema';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  UpdateDateColumn,
} from 'typeorm';

@Entity('addresses')
export class AddressSchema extends BaseSchema {
  @Column({ name: 'cep', type: 'varchar', nullable: true, length: 8 })
  cep: string | null;

  @Column({ name: 'neighborhood', nullable: false, length: 255 })
  neighborhood: string;

  @Column({ name: 'street', nullable: false, length: 255 })
  street: string;

  @Column({ name: 'number', nullable: false, length: 10 })
  number: string;

  @Column({ name: 'complement', type: 'varchar', nullable: true, length: 255 })
  complement: string | null;

  @Column({
    name: 'latitude',
    nullable: true,
    type: 'decimal',
    precision: 10,
    scale: 7,
  })
  latitude: number | null;

  @Column({
    name: 'longitude',
    nullable: true,
    type: 'decimal',
    precision: 10,
    scale: 7,
  })
  longitude: number | null;

  @JoinColumn({
    name: 'city',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'fk_addresses_city_id',
  })
  @ManyToOne(() => CitySchema, (city) => city.addresses, { nullable: false })
  city: CitySchema;

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

  @OneToOne(() => CompanySchema, (company) => company.address)
  company: CompanySchema;
}
