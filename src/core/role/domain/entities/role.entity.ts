import { Company } from '@/core/company/domain/entities/company.entity';
import { ID_USER_DEFAULT } from '@/shared/application/constants/id-user-default';
import { Data } from '@/shared/domain/decorators/data.decorator';
import { BaseEntity } from '@/shared/domain/entity/base-entity';

export type RoleProps = {
  name: string;
  company: Company;
  createdBy: string;
  updatedBy: string;
  deletedBy?: string | null;
};

type CreateRoleProps = {
  name: string;
  company: Company;
  createdBy: string;
  updatedBy: string;
  deletedBy?: string | null;
};

export interface Role extends RoleProps {}

@Data()
export class Role extends BaseEntity<RoleProps> {
  static create(props: CreateRoleProps): Role {
    const role = new Role({
      id: crypto.randomUUID(),
      name: props.name,
      company: props.company,
      createdBy: props.createdBy ?? ID_USER_DEFAULT,
      updatedBy: props.updatedBy ?? ID_USER_DEFAULT,
      deletedBy: props.deletedBy,
    });

    return role;
  }

  protected validate(): void {
    throw new Error('Method not implemented.');
  }
}
