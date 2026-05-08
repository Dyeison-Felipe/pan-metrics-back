import { PermissionEntity } from '@/core/permissions/domain/entity/permission.entity';
import { UserEntity } from '@/core/user/domain/entities/user.entity';
import { Data } from '@/shared/domain/decorators/data.decorator';
import { BaseEntity } from '@/shared/domain/entity/base-entity';

export type UserPermissionProps = {
  id: string;
  user: UserEntity;
  permission: PermissionEntity;
};

export type CreatePermissionProps = {
  user: UserEntity;
  permission: PermissionEntity;
};

export type updatePermissionProps = {
  user: UserEntity;
  permission: PermissionEntity;
};

export class UserPersmissionEntity {
  id: string;
  user: UserEntity;
  permission: PermissionEntity;
  constructor(props: UserPermissionProps) {
    this.id = props.id;
    this.permission = props.permission;
    this.user = props.user;
  }

  static create(props: CreatePermissionProps): UserPersmissionEntity {
    return new UserPersmissionEntity({
      id: crypto.randomUUID(),
      user: props.user,
      permission: props.permission,
    });
  }
}
