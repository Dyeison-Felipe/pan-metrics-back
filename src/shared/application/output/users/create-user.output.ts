import { PermissionsOutput } from "../permissions/permission.output";

export type CreateUserOutput = {
  id: string;
  username: string;
  email: string;
  permissions: PermissionsOutput[]
}