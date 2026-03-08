import { BaseRepository } from "@/shared/domain/repository/base-repository";
import { PermissionEntity } from "../entity/permission.entity";

export interface PermissionRepository extends BaseRepository<PermissionEntity> {
  findAll(): Promise<PermissionEntity[] | null>;
}