import { PermissionRepository } from '@core/permissions/domain/repositories/permission.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PermissionSchema } from '../schema/permission.schema';
import { Inject } from '@nestjs/common';
import { PermissionRepositoryMappper } from './mapper/permission.mapper';
import { PermissionEntity } from '@core/permissions/domain/entity/permission.entity';
import { PROVIDERS } from '@shared/application/constants/providers';

export class PermissionRepositoryImpl implements PermissionRepository {
  constructor(
    @InjectRepository(PermissionSchema)
    private readonly permissionRepository: Repository<PermissionSchema>,
    @Inject(PROVIDERS.PERMISSION_MAPPER)
    private readonly permissionRepositoryMapper: PermissionRepositoryMappper,
  ) {}

  async save(entity: PermissionEntity): Promise<PermissionEntity> {
    const permissionSchema = this.permissionRepositoryMapper.toSchema(entity);

    const savedPermission =
      await this.permissionRepository.save(permissionSchema);

    const permissionEntity =
      this.permissionRepositoryMapper.toEntity(savedPermission);

    return permissionEntity;
  }

  async findAll(): Promise<PermissionEntity[] | null> {
    const permissionsSchema = await this.permissionRepository.find();

    if(!permissionsSchema || permissionsSchema.length === 0) return null;

    const permissionEntity = permissionsSchema.map((permission) => this.permissionRepositoryMapper.toEntity(permission));

    return permissionEntity;

  }

  async findById(id: string): Promise<PermissionEntity | null> {
    const permissionSchema = await this.permissionRepository.findOne({
      where: { id },
    });

    if (!permissionSchema) return null;

    const permissionEntity =
      this.permissionRepositoryMapper.toEntity(permissionSchema);

    return permissionEntity;
  }

  async update(entity: PermissionEntity): Promise<PermissionEntity> {
    const permissionSchema = this.permissionRepositoryMapper.toSchema(entity);

    const savedPermission =
      await this.permissionRepository.save(permissionSchema);

    const permissionEntity =
      this.permissionRepositoryMapper.toEntity(savedPermission);

    return permissionEntity;
  }

  async delete(id: string): Promise<void> {
    await this.permissionRepository.softDelete(id);
  }
}
