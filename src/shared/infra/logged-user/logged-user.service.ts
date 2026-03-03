import { UserEntity } from "@core/user/domain/entities/user.entity";
import { Injectable, Scope } from "@nestjs/common";
import { LoggedUserService } from "@shared/application/logged-user/logged-user.service";

@Injectable({ scope: Scope.REQUEST })
export class LoggedUserServiceImpl implements LoggedUserService {
  private loggedUser: UserEntity;

  getLoggedUser(): UserEntity {
    return this.loggedUser;
  }

  setLoggedUser(loggedUser: UserEntity) {
    this.loggedUser = loggedUser;
  }
  
}