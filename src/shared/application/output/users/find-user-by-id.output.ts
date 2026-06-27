import { PermissionsOutput } from "../permissions/permission.output";

export type FindByUserId = {
  id: string;
  role: string;
  permissions?: PermissionsOutput[]
}