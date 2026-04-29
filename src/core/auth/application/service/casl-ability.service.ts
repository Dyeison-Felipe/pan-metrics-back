import { UserEntity } from "@/core/user/domain/entities/user.entity";
import { PureAbility } from "@casl/ability";
import { PermissionActions, PermissionResources } from "../../domain/permissions-definition/persmissions";

export type AppAbility = PureAbility<[PermissionActions, PermissionResources]>;

export interface AbilityService {
  createForUser(user: UserEntity): AppAbility;
}