import { UserPermissionSchema } from '../../schema/user-permission.schema';
import { Injectable } from '@nestjs/common';
import { UserRepositoryMapper } from '@/core/user/infra/database/typeorm/repositories/mapper/user-mapper';
import { UserPermissionEntity } from '@/core/user-permission/domain/entities/user-permission.entity';
import { PermissionMappper } from '@/core/permission/infra/database/typeorm/repositories/mapper/permission.mapper';

@Injectable()
export class UserPermissionRepositoryMapper {
  static toEntity(schema: UserPermissionSchema): UserPermissionEntity {
    return new UserPermissionEntity({
      id: schema.id,
      user: null as any,
      permission: PermissionMappper.toEntity(schema.permission),
    });
  }
  static toSchema(entity: UserPermissionEntity): UserPermissionSchema {
    return UserPermissionSchema.with({
      id: entity.id,
      user: UserRepositoryMapper.toSchema(entity.user),
      permission: PermissionMappper.toSchema(entity.permission),
    });
  }
}
