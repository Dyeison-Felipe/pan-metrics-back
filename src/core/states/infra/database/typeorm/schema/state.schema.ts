import { CitySchema } from '@core/cities/infra/database/typeorm/schema/city.schema';
import { BaseSchema } from '@shared/infra/database/typeorm/schema/baseSchema/baseSchema';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('states')
export class StateSchema extends BaseSchema {
  @Column({ name: 'name', type: 'varchar', length: 255, nullable: false })
  name: string;

  @Column({ name: 'uf', type: 'varchar', length: 255, nullable: false })
  uf: string;
  
  @OneToMany(() => CitySchema, city => city.state)
  cities: CitySchema[];
}
