import { RepositoryMapper } from '@/shared/infra/database/typeorm/repositories/base-mapper/repository-mapper';
import { PermissionSchema } from '../../schema/permission.schema';
import { PermissionEntity } from '@/core/permissions/domain/entity/permission.entity';
import { UserSchema } from '@/core/user/infra/database/typeorm/schema/user.schema';

export class PermissionRepositoryMappper implements RepositoryMapper<
  PermissionSchema,
  PermissionEntity
> {
  toEntity(schema: PermissionSchema): PermissionEntity {
    return new PermissionEntity({
      id: schema.id,
      action: schema.action,
      subject: schema.subject,
      auditable: {
        createdAt: schema.createdAt,
        updatedAt: schema.updatedAt,
        deletedAt: schema.deletedAt,
      }
    });
  }
  toSchema(entity: PermissionEntity): PermissionSchema {
    return PermissionSchema.with({
      id: entity.id,
      action: entity.action,
      subject: entity.action,
      createdAt: entity.auditable?.createdAt,
      updatedAt: entity.auditable?.updatedAt,
      deletedAt: entity.auditable?.deletedAt,
    });
  }
}
