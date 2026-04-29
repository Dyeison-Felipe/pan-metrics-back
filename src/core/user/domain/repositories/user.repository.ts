import { BaseRepository } from '@/shared/domain/repository/base-repository';
import { UserEntity } from '../entities/user.entity';
import { PermissionRef } from '@/core/auth/domain/permissions-definition/persmissions';

export type UserLogin = UserEntity & {
  permissions: PermissionRef[];
};

export interface UserRepository extends BaseRepository<UserEntity> {
  findByEmail(email: string): Promise<UserEntity | null>;
  findByIdWithPermissions(id: string): Promise<UserEntity | null>;
}
