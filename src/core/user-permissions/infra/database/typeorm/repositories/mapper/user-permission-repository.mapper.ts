import { RepositoryMapper } from '@/shared/infra/database/typeorm/repositories/base-mapper/repository-mapper';
import { UserPermissionSchema } from '../../schema/user-permission.schema';
import { UserPersmissionEntity } from '@/core/user-permissions/domain/entities/user-permission.entity';
import { Inject, Injectable } from '@nestjs/common';
import { PROVIDERS } from '@/shared/application/constants/providers';
import { UserRepositoryMapper } from '@/core/user/infra/database/typeorm/repositories/mapper/user-mapper';
import { PermissionRepositoryMappper } from '@/core/permissions/infra/database/typeorm/repositories/mapper/permission.mapper';

@Injectable()
export class UserPermissionRepositoryMapper implements RepositoryMapper<
  UserPermissionSchema,
  UserPersmissionEntity
> {
  constructor(
    @Inject(PROVIDERS.USER_MAPPER)
    private readonly userRepositoryMapper: UserRepositoryMapper,
    @Inject(PROVIDERS.PERMISSION_MAPPER)
    private readonly permissionRepositoryMapper: PermissionRepositoryMappper,
  ) {}

  toEntity(schema: UserPermissionSchema): UserPersmissionEntity {
    return new UserPersmissionEntity({
      id: schema.id,
      user: this.userRepositoryMapper.toEntity(schema.user),
      permission: this.permissionRepositoryMapper.toEntity(schema.permission),
      auditable: {
        createdAt: schema.createdAt,
        updatedAt: schema.updatedAt,
        deletedAt: schema.deletedAt,
      },
    });
  }
  toSchema(entity: UserPersmissionEntity): UserPermissionSchema {
    return UserPermissionSchema.with({
      id: entity.id,
      user: this.userRepositoryMapper.toSchema(entity.user),
      permission: this.permissionRepositoryMapper.toSchema(entity.permission),
      createdAt: entity.auditable?.createdAt,
      updatedAt: entity.auditable?.updatedAt,
      deletedAt: entity.auditable?.deletedAt,
    });
  }
}
