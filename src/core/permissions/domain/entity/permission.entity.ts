import { Data } from "@/shared/domain/decorators/data.decorator"
import { BaseEntity } from "@/shared/domain/entity/baseEntity"

type PermissionProps = {
  resource: string
}

export interface PermissionEntity extends PermissionProps {};

@Data()
export class PermissionEntity extends BaseEntity<PermissionProps> {}