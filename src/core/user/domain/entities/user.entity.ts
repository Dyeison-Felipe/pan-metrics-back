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
  active: boolean;
  createdBy: string;
  updatedBy: string;
};

export interface UserEntity extends UserProps {}

@Data()
export class UserEntity extends BaseEntity<UserProps> {
  static create(props: CreateUserProps): UserEntity {

    UserEntity.validate(props);

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

  static validate(props: UserProps) {
    const validator = UserValidatorFactory.create();

    const isValid = validator.validate(props);

    if (!isValid) {
      throw new EntityValidationError(validator.errors);
    }
  }
}
