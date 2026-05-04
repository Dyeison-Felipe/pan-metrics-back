import { UserPersmissionEntity } from '@/core/user-permissions/domain/entities/user-permission.entity';
import { ID_USER_DEFAULT } from '@/shared/application/constants/id-user-default';
import { Data } from '@/shared/domain/decorators/data.decorator';
import { BaseEntity } from '@/shared/domain/entity/baseEntity';
import { UserValidatorFactory } from '../validators/user-validator';
import { EntityValidationError } from '@/shared/application/errors/validation-error';

export type UserProps = {
  username: string;
  password: string;
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
  createdBy: string;
  updatedBy: string;
};

type UpdateUserProps = {
  username: string;
  updatedBy: string;
};

export interface UserEntity extends UserProps {}

@Data()
export class UserEntity extends BaseEntity<UserProps> {
  static create(props: CreateUserProps): UserEntity {
    const entity = new UserEntity({
      id: crypto.randomUUID(),
      username: props.username,
      password: props.password,
      active: true,
      createdBy: props.createdBy ?? ID_USER_DEFAULT,
      updatedBy: props.updatedBy ?? ID_USER_DEFAULT,
    });

    return entity;
  }

  markAsDeletedBy(userId: string): void {
    this.deletedBy = userId;
  }

  update(props: UpdateUserProps): void {
    this.username = props.username;
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

  protected validate() {
    const validator = UserValidatorFactory.create();

    const isValid = validator.validate(this);

    if (!isValid) {
      throw new EntityValidationError(validator.errors);
    }
  }
}
