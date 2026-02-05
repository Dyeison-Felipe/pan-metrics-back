import { Data } from '../../../../shared/domain/decorators/data.decorator';
import { BaseEntity } from '../../../../shared/domain/entity/baseEntity';

type RoleProps = {
  name: string;
};

type CreateRoleProps = RoleProps;

type UpdateRoleProps = RoleProps;

export interface Role extends RoleProps {}

@Data()
export class Role extends BaseEntity<RoleProps> {

  static createRole(role: CreateRoleProps): Role {
    const newRole = new Role(role);

    return newRole;
  }

  static updateRole(entity: Role, role: UpdateRoleProps ): void {
    entity.name = role.name;
  }
}
