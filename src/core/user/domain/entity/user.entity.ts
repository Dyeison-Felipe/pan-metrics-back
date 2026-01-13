import { BaseEntity } from "../../../../shared/domain/entity/baseEntity";

type UserProps = {
  username: string;
  password: string;
  email: string;
  phoneNumber: string;
}

export class User extends BaseEntity<UserProps> {}