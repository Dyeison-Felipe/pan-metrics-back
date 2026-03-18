import { Module } from '@nestjs/common';
import { EnvConfigModule } from './shared/infra/env-config/env-config.module';
import { DatabaseModule } from './shared/infra/database/typeorm/database.module';
import { HashModule } from './shared/infra/hash/hash.module';
import { AddressModule } from '@/core/address/infra/address.module';
import { StateModule } from '@/core/states/infra/state.module';
import { CityModule } from '@/core/cities/infra/city.module';
import { UserModule } from '@/core/user/infra/user.module';
import { AuthModule } from '@/core/auth/infra/auth.module';
import { JwtConfigModule } from '@/shared/infra/jwt/jwt.module';
import { PermissionModule } from '@/core/permissions/infra/permission.module';
import { LoggedUserModule } from '@/shared/infra/logged-user/logged-user.module';

@Module({
  imports: [
    LoggedUserModule,
    EnvConfigModule,
    DatabaseModule,
    HashModule,
    AddressModule,
    StateModule,
    CityModule,
    UserModule,
    AuthModule,
    JwtConfigModule,
    PermissionModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
