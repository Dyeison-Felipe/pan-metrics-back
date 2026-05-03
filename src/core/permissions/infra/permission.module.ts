import { Module } from '@nestjs/common';
import { PROVIDERS } from '@/shared/application/constants/providers';
import { PermissionRepositoryImpl } from './database/typeorm/repositories/permission.repository';
import { PermissionRepositoryMappper } from './database/typeorm/repositories/mapper/permission.mapper';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermissionSchema } from './database/typeorm/schema/permission.schema';
import { FindAllPermissionsUseCase } from '../application/usecase/find-all-permissions';
import { PermissionRepository } from '../domain/repositories/permission.repository';
import { PermissionController } from './controllers/permission.controller';

@Module({
  imports: [TypeOrmModule.forFeature([PermissionSchema])],
  controllers: [PermissionController],
  providers: [
    {
      provide: PROVIDERS.PERMISSION_REPOSITORY,
      useClass: PermissionRepositoryImpl,
    },
    {
      provide: FindAllPermissionsUseCase,
      useFactory: (permissionRepository: PermissionRepository) => {
        return new FindAllPermissionsUseCase(permissionRepository);
      },
      inject: [PROVIDERS.PERMISSION_REPOSITORY],
    },
  ],
  exports: [PROVIDERS.PERMISSION_REPOSITORY],
})
export class PermissionModule {}
