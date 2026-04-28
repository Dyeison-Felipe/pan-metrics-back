import { PermissionEntity } from '@/core/permissions/domain/entity/permission.entity';
import { UserEntity } from '@/core/user/domain/entities/user.entity';
import { Data } from '@/shared/domain/decorators/data.decorator';
import { BaseEntity } from '@/shared/domain/entity/baseEntity';

export type UserPermissionProps = {
  user: UserEntity;
  permission: PermissionEntity;
};

export type CreatePermissionProps = {
  user: UserEntity;
  permission: PermissionEntity;
};

export interface UserPersmissionEntity extends UserPermissionProps {}

@Data()
export class UserPersmissionEntity extends BaseEntity<UserPermissionProps> {
  static create(props: CreatePermissionProps): UserPersmissionEntity {
    return new UserPersmissionEntity({
      id: crypto.randomUUID(),
      user: props.user,
      permission: props.permission,
    });
  }
}
