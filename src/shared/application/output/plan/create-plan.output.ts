import { PermissionsOutput } from "../permissions/permission.output";

export type CreatePlanOutput = {
  id: string,
  name: string,
  description: string,
  price: number,
  active: boolean,
  duration: string;
  permissions: PermissionsOutput[]
}