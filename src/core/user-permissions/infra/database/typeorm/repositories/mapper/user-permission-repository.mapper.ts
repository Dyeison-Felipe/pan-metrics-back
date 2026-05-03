import { UserPermissionSchema } from '../../schema/user-permission.schema';
import { UserPersmissionEntity } from '@/core/user-permissions/domain/entities/user-permission.entity';
import { Inject, Injectable } from '@nestjs/common';
import { PROVIDERS } from '@/shared/application/constants/providers';
import { UserRepositoryMapper } from '@/core/user/infra/database/typeorm/repositories/mapper/user-mapper';
import { PermissionRepositoryMappper } from '@/core/permissions/infra/database/typeorm/repositories/mapper/permission.mapper';

@Injectable()
export class UserPermissionRepositoryMapper {
  static toEntity(schema: UserPermissionSchema): UserPersmissionEntity {
    return new UserPersmissionEntity({
      id: schema.id,
      user: null as any,
      permission: PermissionRepositoryMappper.toEntity(schema.permission),
      auditable: {
        createdAt: schema.createdAt,
        updatedAt: schema.updatedAt,
        deletedAt: schema.deletedAt,
      },
    });
  }
  static toSchema(entity: UserPersmissionEntity): UserPermissionSchema {
    return UserPermissionSchema.with({
      id: entity.id,
      user: UserRepositoryMapper.toSchema(entity.user),
      permission: PermissionRepositoryMappper.toSchema(entity.permission),
      createdAt: entity.auditable?.createdAt,
      updatedAt: entity.auditable?.updatedAt,
      deletedAt: entity.auditable?.deletedAt,
    });
  }
}
