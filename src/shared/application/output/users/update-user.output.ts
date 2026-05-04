import { PermissionsOutput } from "../permissions/permission.output";

export type UpdateUserOutput = {
  id: string;
  username: string;
  permissions: PermissionsOutput[]
}