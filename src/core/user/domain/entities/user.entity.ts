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
  passwordResetCode?: string | null;
  passwordResetCodeExpiresAt?: Date | null;
  email: string;
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

type UpdatePassword = {
  password: string;
  updatedBy?: string;
}

export interface UserEntity extends UserProps { }

@Data()
export class UserEntity extends BaseEntity<UserProps> {
  static create(props: CreateUserProps): UserEntity {
    const entity = new UserEntity({
      id: crypto.randomUUID(),
      username: props.username,
      password: props.password,
      active: true,
      email: props.email,
      passwordResetCodeExpiresAt: null,
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
    this.email = props.email;
    this.updatedBy = props.updatedBy;
    this.updateTimestamp();
  }

  updatePassword(props: UpdatePassword): void {
    this.password = props.password;
    if (props.updatedBy) {
      this.updatedBy = props.updatedBy;
      this.updateTimestamp();
    }
  }

  inativateUser(): void {
    this.active = false;
  }

  updateResetPasswordCode(code?: string): void {
    if (code) {
      this.passwordResetCode = code;
      this.passwordResetCodeExpiresAt = new Date();
      return;
    }
    this.passwordResetCodeExpiresAt = null
    this.passwordResetCode = null;
  }

  protected validate() {
    const validator = UserValidatorFactory.create();

    const isValid = validator.validate(this);

    if (!isValid) {
      throw new EntityValidationError(validator.errors);
    }
  }
}
