import { PermissionRepository } from '@/core/permissions/domain/repositories/permission.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Inject } from '@nestjs/common';
import { PermissionRepositoryMappper } from './mapper/permission.mapper';
import { PermissionEntity } from '@/core/permissions/domain/entity/permission.entity';
import { PROVIDERS } from '@/shared/application/constants/providers';
import { PermissionSchema } from '../schema/permission.schema';

export class PermissionRepositoryImpl implements PermissionRepository {
  constructor(
    @InjectRepository(PermissionSchema)
    private readonly permissionRepository: Repository<PermissionSchema>,
  ) {}

  async findPermissionsById(ids: string[]): Promise<PermissionEntity[]> {
    const permissionsSchema = await this.permissionRepository.find({
      where: { id: In(ids) },
    });

    const permissionsEntity = permissionsSchema.map((permission) =>
      PermissionRepositoryMappper.toEntity(permission),
    );

    return permissionsEntity;
  }

  async save(entity: PermissionEntity): Promise<PermissionEntity> {
    const permissionSchema = PermissionRepositoryMappper.toSchema(entity);

    const savedPermission =
      await this.permissionRepository.save(permissionSchema);

    const permissionEntity =
      PermissionRepositoryMappper.toEntity(savedPermission);

    return permissionEntity;
  }

  async findAll(): Promise<PermissionEntity[] | null> {
    const permissionsSchema = await this.permissionRepository.find();

    if (!permissionsSchema || permissionsSchema.length === 0) return null;

    const permissionEntity = permissionsSchema.map((permission) =>
      PermissionRepositoryMappper.toEntity(permission),
    );

    return permissionEntity;
  }

  async findById(id: string): Promise<PermissionEntity | null> {
    const permissionSchema = await this.permissionRepository.findOne({
      where: { id },
    });

    if (!permissionSchema) return null;

    const permissionEntity =
      PermissionRepositoryMappper.toEntity(permissionSchema);

    return permissionEntity;
  }

  async update(entity: PermissionEntity): Promise<PermissionEntity> {
    const permissionSchema = PermissionRepositoryMappper.toSchema(entity);

    const savedPermission =
      await this.permissionRepository.save(permissionSchema);

    const permissionEntity =
      PermissionRepositoryMappper.toEntity(savedPermission);

    return permissionEntity;
  }

  async delete(id: string): Promise<void> {
    await this.permissionRepository.softDelete(id);
  }
}
