import { PermissionsOutput } from "../permissions/permission.output"
import { PlanOutput } from "../plan/plan.output"

export type PlanPermissionOutput = {
  plan: PlanOutput
  permissions:  Pick<PermissionsOutput, 'description'>[]
}