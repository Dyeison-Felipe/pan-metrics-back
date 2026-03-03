import { UserEntity } from "@core/user/domain/entities/user.entity";

export interface LoggedUserService {
  getLoggedUser(): UserEntity;
  setLoggedUser(loggedUser: UserEntity): void;
}