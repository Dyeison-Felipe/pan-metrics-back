import { CompanyOutput } from "../company/company.output";
import { PermissionsOutput } from "../permissions/permission.output";
import { RoleOutput } from "../role/role.output";

export type FindByUserId = {
  id: string;
  role: string;
  permissions?: PermissionsOutput[]
}