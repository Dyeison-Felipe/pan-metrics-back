import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleSchema } from './database/typeorm/schema/role.schema';
import { PROVIDERS } from '@/shared/application/constants/providers';
import { RoleRepositoryImpl } from './database/typeorm/repository/role.repository';

@Module({
  imports: [TypeOrmModule.forFeature([RoleSchema])],
  controllers: [],
  providers: [
    {
      provide: PROVIDERS.ROLE_REPOSITORY,
      useClass: RoleRepositoryImpl,
    },
  ],
  exports: [PROVIDERS.ROLE_REPOSITORY],
})
export class RoleModule {}
