import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { AddressSchema } from '../../../../../address/infra/database/typeorm/schema/address.schema';
import { BaseSchema } from '../../../../../../shared/infra/database/typeorm/schema/baseSchema/baseSchema';
import { StateSchema } from '@core/states/infra/database/typeorm/schema/state.schema';

@Entity('cities')
export class CitySchema extends BaseSchema {

  @Column({ name: 'city', type: 'varchar', length: 255, nullable: false })
  name: string;

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
