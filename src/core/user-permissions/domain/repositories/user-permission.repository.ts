import { UserPersmissionEntity } from "../entities/user-permission.entity";

export interface UserPermissionRepository {
  create(entity: UserPersmissionEntity):Promise<UserPersmissionEntity>;
  findAllPermissionByUser(userId: string): Promise<UserPersmissionEntity[]>;
  softDelete(id: string): Promise<void>;
}