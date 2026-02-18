import { Module } from "@nestjs/common";
import { PROVIDERS } from "@shared/application/constants/providers";
import { PermissionRepositoryImpl } from "./database/typeorm/repositories/permission.repository";
import { PermissionRepositoryMappper } from "./database/typeorm/repositories/mapper/permission.mapper";

@Module({
imports: [],
controllers: [],
providers: [
  {
    provide: PROVIDERS.PERMISSION_REPOSITORY,
    useClass: PermissionRepositoryImpl
  },
  {
    provide: PROVIDERS.PERMISSION_MAPPER,
    useClass: PermissionRepositoryMappper
  }
],
exports: [  PROVIDERS.PERMISSION_REPOSITORY, PROVIDERS.PERMISSION_MAPPER]
})
export class PermissionModule {}