import { Data } from "@shared/domain/decorators/data.decorator";
import { BaseEntity } from "@shared/domain/entity/baseEntity";

export type UserProps = {
  username: string;
  password: string;
  email: string;
  active: boolean;
}

type CreateUserProps = {
  username: string;
  password: string;
  email: string;
};

export interface UserEntity extends UserProps {}

@Data()
export class UserEntity extends BaseEntity<UserProps>{

  static create(props: CreateUserProps): UserEntity {
    return new UserEntity({
      id: crypto.randomUUID(),
      username: props.username,
      email: props.email,
      password: props.password,
      active: true,
    })
  }
}