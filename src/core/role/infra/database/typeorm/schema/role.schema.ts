import { Column, Entity } from 'typeorm';
import { BaseSchema } from '../../../../../../shared/infra/database/typeorm/schema/baseSchema';

export type RoleSchemaProps = InstanceType<typeof RoleSchema>;

@Entity('role')
export class RoleSchema extends BaseSchema {
  @Column({ name: 'name', nullable: false, type: 'varchar', length: 255 })
  name: string;
}
