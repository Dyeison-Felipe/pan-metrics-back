import { Global, Module } from "@nestjs/common";
import { PROVIDERS } from "@shared/application/constants/providers";
import { LoggedUserServiceImpl } from "./logged-user.service";

@Global()
@Module({
  imports: [],
  providers: [{
    provide: PROVIDERS.LOGGED_USER_SERVICE,
    useClass: LoggedUserServiceImpl
  }],
  exports: [PROVIDERS.LOGGED_USER_SERVICE],
})
export class LoggedUserModule {}