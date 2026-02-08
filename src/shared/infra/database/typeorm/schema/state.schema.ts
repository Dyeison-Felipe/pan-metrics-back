import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CitySchema } from './city.schema';
import { BaseSchema } from './baseSchema/baseSchema';

@Entity('states')
export class StateSchema extends BaseSchema {
  @Column({ name: 'name', type: 'varchar', length: 255, nullable: false })
  name: string;

  @Column({ name: 'uf', type: 'varchar', length: 255, nullable: false })
  uf: string;
  
  @OneToMany(() => CitySchema, city => city.state)
  cities: CitySchema[];
}
