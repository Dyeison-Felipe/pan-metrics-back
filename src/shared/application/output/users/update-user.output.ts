import { CompanyOutput } from "../company/company.output";
import { PermissionsOutput } from "../permissions/permission.output";
import { RoleOutput } from "../role/role.output";

export type UpdateUserOutput = {
  id: string;
  username: string;
  email: string;
  role: RoleOutput;
  company: CompanyOutput
  permissions: PermissionsOutput[]
}