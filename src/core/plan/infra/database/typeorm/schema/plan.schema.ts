import { BaseEntity, Column, Entity } from 'typeorm';

@Entity('plan')
export class PlanSchema extends BaseEntity {
  @Column({ name: 'name', type: 'varchar', nullable: false })
  name: string;

  @Column({ name: 'description', type: 'varchar', nullable: false })
  description: string;

  @Column({ name: 'price', type: 'int', nullable: false })
  price: number;

  @Column({ name: 'active', type: 'boolean', nullable: false })
  active: boolean;
}
