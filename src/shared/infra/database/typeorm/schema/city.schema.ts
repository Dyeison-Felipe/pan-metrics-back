import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { StateSchema } from './state.schema';
import { AddressSchema } from '../../../../../core/address/infra/database/typeorm/schema/address.schema';
import { BaseSchema } from './baseSchema/baseSchema';

@Entity('cities')
export class CitySchema extends BaseSchema {

  @Column({ name: 'city', type: 'varchar', length: 255, nullable: false })
  city: string;

  @ManyToOne(() => StateSchema, (state) => state.cities, { nullable: false })
  @JoinColumn({
    name: 'state',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'fk_cities_state',
  })
  state: StateSchema;

  @OneToMany(() => AddressSchema, address => address.city)
  addresses: AddressSchema[];
}
