import { PermissionInput } from "../permission/permission.input";

export type CreateUserInput = {
  username: string;
  password: string;
  email: string;
  permissionsId: string[]
}