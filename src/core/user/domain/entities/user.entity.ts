import { UserPersmissionEntity } from '@/core/user-permissions/domain/entities/user-permission.entity';
import { ID_USER_DEFAULT } from '@/shared/application/constants/id-user-default';
import { Data } from '@/shared/domain/decorators/data.decorator';
import { BaseEntity } from '@/shared/domain/entity/baseEntity';

export type UserProps = {
  username: string;
  password: string;
  email: string;
  active: boolean;
  recoverPasswordJwt?: string | null;
  createdBy: string;
  updatedBy: string;
  deletedBy?: string | null;
  userPermissions?: UserPersmissionEntity[];
};

type CreateUserProps = {
  username: string;
  password: string;
  email: string;
  createdBy: string;
  updatedBy: string;
};

type UpdateUserProps = {
  username: string;
  email: string;
  updatedBy: string;
};

export interface UserEntity extends UserProps {}

@Data()
export class UserEntity extends BaseEntity<UserProps> {
  static create(props: CreateUserProps): UserEntity {
    return new UserEntity({
      id: crypto.randomUUID(),
      username: props.username,
      email: props.email,
      password: props.password,
      active: true,
      auditable: {
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      createdBy: props.createdBy ?? ID_USER_DEFAULT,
      updatedBy: props.updatedBy ?? ID_USER_DEFAULT,
    });
  }

  update(props: UpdateUserProps): void {
    this.username = props.username;
    this.email = props.email;
    this.updateTimestamp();
  }

  updatePassword(password: string): void {
    this.password = password;
  }

  inativateUser(): void {
    this.active = false;
  }

  updateRecoverPasswordJwt(jwt?: string): void {
    if (jwt) {
      this.recoverPasswordJwt = jwt;
      return;
    }
    this.recoverPasswordJwt = null;
  }
}
