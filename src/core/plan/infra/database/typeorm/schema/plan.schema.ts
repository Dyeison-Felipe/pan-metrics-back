import { BaseSchema } from '@/shared/infra/database/typeorm/schema/baseSchema/baseSchema';
import { Column, Entity } from 'typeorm';

@Entity('plan')
export class PlanSchema extends BaseSchema {
  @Column({ name: 'name', type: 'varchar', nullable: false })
  name: string;

  @Column({ name: 'description', type: 'varchar', nullable: false })
  description: string;

  @Column({ name: 'price', type: 'int', nullable: false })
  price: number;

  @Column({ name: 'active', type: 'boolean', nullable: false })
  active: boolean;

  @Column({ name: 'duration', type: 'varchar', nullable: false })
  duration: string;

}
