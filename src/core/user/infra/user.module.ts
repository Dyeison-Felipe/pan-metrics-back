import { Global, Module } from '@nestjs/common';
import { UserRepositoryMapper } from './database/typeorm/repositories/mapper/user-mapper';
import { PROVIDERS } from '@/shared/application/constants/providers';
import { UserRepositoryImpl } from './database/typeorm/repositories/user.repository';
import { HashModule } from '@/shared/infra/hash/hash.module';
import { CreateUserUseCase } from '../application/usecase/create-user.usecase';
import { UserRepository } from '../domain/repositories/user.repository';
import { HashService } from '@/shared/application/hash/hash.service';
import { UserController } from './controllers/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserSchema } from './database/typeorm/schema/user.schema';
import { LoggedUserService } from '@/shared/application/logged-user/logged-user.service';
import { UserPermissionRepository } from '@/core/user-permissions/domain/repositories/user-permission.repository';
import { PermissionRepository } from '@/core/permissions/domain/repositories/permission.repository';
import { PermissionModule } from '@/core/permissions/infra/permission.module';
import { UserPermissionModule } from '@/core/user-permissions/infra/user-permission.module';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([UserSchema]),
    HashModule,
    PermissionModule,
    UserPermissionModule,
  ],
  controllers: [UserController],
  providers: [
    {
      provide: PROVIDERS.USER_REPOSITORY,
      useClass: UserRepositoryImpl,
    },
    {
      provide: CreateUserUseCase,
      useFactory: (
        userRepository: UserRepository,
        hashService: HashService,
        loggedUserService: LoggedUserService,
        userPermissionRepository: UserPermissionRepository,
        permissionRepository: PermissionRepository,
      ) => {
        return new CreateUserUseCase(
          userRepository,
          hashService,
          loggedUserService,
          userPermissionRepository,
          permissionRepository,
        );
      },
      inject: [
        PROVIDERS.USER_REPOSITORY,
        PROVIDERS.HASH_SERVICE,
        PROVIDERS.LOGGED_USER_SERVICE,
        PROVIDERS.USER_PERMISSION_REPOSITORY,
        PROVIDERS.PERMISSION_REPOSITORY,
      ],
    },
  ],
  exports: [PROVIDERS.USER_REPOSITORY],
})
export class UserModule {}
