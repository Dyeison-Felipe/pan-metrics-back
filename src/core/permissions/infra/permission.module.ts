import { Module } from '@nestjs/common';
import { PROVIDERS } from '@shared/application/constants/providers';
import { PermissionRepositoryImpl } from './database/typeorm/repositories/permission.repository';
import { PermissionRepositoryMappper } from './database/typeorm/repositories/mapper/permission.mapper';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermissionSchema } from './database/typeorm/schema/permission.schema';

@Module({
  imports: [TypeOrmModule.forFeature([PermissionSchema])],
  controllers: [],
  providers: [
    {
      provide: PROVIDERS.PERMISSION_MAPPER,
      useClass: PermissionRepositoryMappper,
    },
    {
      provide: PROVIDERS.PERMISSION_REPOSITORY,
      useClass: PermissionRepositoryImpl,
    },
  ],
  exports: [PROVIDERS.PERMISSION_REPOSITORY, PROVIDERS.PERMISSION_MAPPER],
})
export class PermissionModule {}
