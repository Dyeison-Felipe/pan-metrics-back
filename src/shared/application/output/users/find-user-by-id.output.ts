import { CompanyOutput } from "../company/company.output";
import { PermissionsOutput } from "../permissions/permission.output";
import { RoleOutput } from "../role/role.output";

export type FindByUserId = {
  username: string;
  email: string;
  id: string;
  role: RoleOutput;
  company:CompanyOutput
  permissions?: PermissionsOutput[]
}