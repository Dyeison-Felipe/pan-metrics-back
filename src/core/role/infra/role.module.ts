import { Module } from '@nestjs/common';
import { getDataSourceToken, TypeOrmModule } from '@nestjs/typeorm';
import { RoleSchema } from './database/typeorm/schema/role.schema';
import { RoleController } from './controller/role.controller';
import { RoleRepositoryImpl } from './database/typeorm/repositories/role.repository';
import { DataSource } from 'typeorm';
import { PROVIDERS } from '../../../shared/application/constants/providers';
import { RoleMapper } from './database/typeorm/repositories/mapper/role-mapper';
import { CreateRoleUseCase } from '../application/usecase/create.usecase';
import { RoleRepository } from '../domain/repositories/role.repository';

@Module({
  imports: [TypeOrmModule.forFeature([RoleSchema])],
  controllers: [RoleController],
  providers: [
    {
      provide: PROVIDERS.ROLE_MAPPER,
      useClass: RoleMapper,
    },
    {
      provide: PROVIDERS.ROLE_REPOSITORY,
      useFactory: (dataSource: DataSource, roleMapper: RoleMapper) => {
        return new RoleRepositoryImpl(
          dataSource.getRepository(RoleSchema),
          roleMapper,
        );
      },
      inject: [getDataSourceToken(), PROVIDERS.ROLE_MAPPER],
    },
    {
      provide: CreateRoleUseCase,
      useFactory: (roleRepository: RoleRepository) => {
        return new CreateRoleUseCase(roleRepository);
      },
      inject: [PROVIDERS.ROLE_REPOSITORY]
    }
  ],
  exports: [PROVIDERS.ROLE_REPOSITORY],
})
export class RoleModule {}
