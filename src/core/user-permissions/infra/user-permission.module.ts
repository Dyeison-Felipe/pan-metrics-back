import { UserEntity } from '@/core/user/domain/entities/user.entity';
import { PROVIDERS } from '@/shared/application/constants/providers';
import { Module } from '@nestjs/common';
import { UserPermissionRepositoryMapper } from './database/typeorm/repositories/mapper/user-permission-repository.mapper';
import { UserPermissionRepositoryImpl } from './database/typeorm/repositories/user-permission.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserPermissionSchema } from './database/typeorm/schema/user-permission.schema';
import { PermissionModule } from '@/core/permissions/infra/permission.module';
import { UserModule } from '@/core/user/infra/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserPermissionSchema]), PermissionModule, UserModule],
  providers: [
    {
      provide: PROVIDERS.USER_PERMISSION_MAPPER,
      useClass: UserPermissionRepositoryMapper,
    },
    {
      provide: PROVIDERS.USER_PERMISSION_REPOSITORY,
      useClass: UserPermissionRepositoryImpl,
    },
  ],
  exports: [
    PROVIDERS.USER_PERMISSION_MAPPER,
    PROVIDERS.USER_PERMISSION_REPOSITORY,
  ],
})
export class UserPermissionModule {}
