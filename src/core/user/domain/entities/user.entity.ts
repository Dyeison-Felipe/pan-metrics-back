import { ID_USER_DEFAULT } from "@/shared/application/constants/id-user-default";
import { Data } from "@/shared/domain/decorators/data.decorator";
import { BaseEntity } from "@/shared/domain/entity/baseEntity";
import { UserValidatorFactory } from "../validators/user-validator";
import { EntityValidationError } from "@/shared/application/errors/validation-error";

export type UserProps = {
  username: string;
  password: string;
  email: string;
  active: boolean;
  createdBy: string;
  updatedBy: string;
  deletedBy?: string | null;
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
  password: string;
  email: string;
  active: boolean;
  updatedBy: string;
}

export interface UserEntity extends UserProps { }

@Data()
export class UserEntity extends BaseEntity<UserProps> {
  static create(props: CreateUserProps): UserEntity {

    const entity = new UserEntity({
      id: crypto.randomUUID(),
      username: props.username,
      email: props.email,
      password: props.password,
      active: true,
      createdBy: props.createdBy ?? ID_USER_DEFAULT,
      updatedBy: props.updatedBy ?? ID_USER_DEFAULT,
    });

    return entity;
  }

  update(props: UpdateUserProps): void {
    this.username = props.username;
    this.password = props.password;
    this.email = props.email;
    this.active = props.active;
    this.updatedBy = props.updatedBy;

    this.updateTimestamp();

    this.validate();
  }

  markAsDeletedBy(userId: string): void {
    this.deletedBy = userId;
  }

  protected validate() {
    const validator = UserValidatorFactory.create();

    const isValid = validator.validate(this);

    if (!isValid) {
      throw new EntityValidationError(validator.errors);
    }
  }
}
