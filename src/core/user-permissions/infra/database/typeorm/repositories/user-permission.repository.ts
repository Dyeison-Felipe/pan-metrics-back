import { UserPermissionRepository } from '@/core/user-permissions/domain/repositories/user-permission.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { UserPermissionSchema } from '../schema/user-permission.schema';
import { Repository } from 'typeorm';
import { UserPersmissionEntity } from '@/core/user-permissions/domain/entities/user-permission.entity';
import { Inject } from '@nestjs/common';
import { PROVIDERS } from '@/shared/application/constants/providers';
import { UserPermissionRepositoryMapper } from './mapper/user-permission-repository.mapper';

export class UserPermissionRepositoryImpl implements UserPermissionRepository {
  constructor(
    @InjectRepository(UserPermissionSchema)
    private readonly userPermissionRepository: Repository<UserPermissionSchema>,
  ) {}

  async create(entity: UserPersmissionEntity): Promise<UserPersmissionEntity> {
    const userPermissionSchema =
      UserPermissionRepositoryMapper.toSchema(entity);

    const save = await this.userPermissionRepository.save(userPermissionSchema);

    const UserPersmissionEntity = UserPermissionRepositoryMapper.toEntity(save);

    return UserPersmissionEntity;
  }

  async findAllPermissionByUser(
    userId: string,
  ): Promise<UserPersmissionEntity[]> {
    const userPermissions = await this.userPermissionRepository.find({
      where: { user: { id: userId } },
      relations: ['user', 'permission'],
    });

    const userPermissionEntity = userPermissions.map((userPermission) =>
      UserPermissionRepositoryMapper.toEntity(userPermission),
    );

    return userPermissionEntity;
  }

  async softDelete(id: string): Promise<void> {
    await this.userPermissionRepository.softDelete(id);
  }
}
