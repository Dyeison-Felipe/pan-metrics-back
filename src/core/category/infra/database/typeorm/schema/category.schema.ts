import { CompanySchema } from '@/core/company/infra/database/typeorm/schema/company.schema';
import { BaseSchema } from '@/shared/infra/database/typeorm/schema/baseSchema/baseSchema';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity('category')
export class CategorySchema extends BaseSchema {
  @Column({ name: 'name', nullable: false, type: 'varchar', length: 255 })
  name: string;

  @ManyToOne(() => CompanySchema, (company) => company.category)
  @JoinColumn({ name: 'company' })
  company: CompanySchema;

  @ManyToOne(() => CategorySchema, (category) => category.children, {
    nullable: true,
  })
  @JoinColumn({ name: 'parent' })
  parent: CategorySchema | null;

  @OneToMany(() => CategorySchema, (category) => category.parent)
  children: CategorySchema[];
}
