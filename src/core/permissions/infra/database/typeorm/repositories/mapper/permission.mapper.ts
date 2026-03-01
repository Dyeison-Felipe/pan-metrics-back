import { RepositoryMapper } from '@shared/infra/database/typeorm/repositories/base-mapper/repository-mapper';
import { PermissionSchema } from '../../schema/permission.schema';
import { PermissionEntity } from '@core/permissions/domain/entity/permission.entity';
import { UserSchema } from '@core/user/infra/database/typeorm/schema/user.schema';

export class PermissionRepositoryMappper implements RepositoryMapper<
  PermissionSchema,
  PermissionEntity
> {
  toEntity(schema: PermissionSchema): PermissionEntity {
    return new PermissionEntity({
      id: schema.id,
      resource: schema.resource,
      auditable: {
        createdAt: schema.createdAt,
        updatedAt: schema.updatedAt,
        deletedAt: schema.deletedAt,
        createdBy: schema.createdBy?.id,
        updatedBy: schema.updatedBy?.id,
        deletedBy: schema.deletedBy?.id,
      },
    });
  }
  toSchema(entity: PermissionEntity): PermissionSchema {
    return PermissionSchema.with({
      id: entity.id,
      resource: entity.resource,
      createdAt: entity.audit.createdAt,
      updatedAt: entity.audit.updatedAt,
      deletedAt: entity.audit.deletedAt,
      createdBy: entity.audit.createdBy
        ? UserSchema.from({ id: entity.audit.createdBy })
        : null,
      updatedBy: entity.audit.updatedBy
        ? UserSchema.from({ id: entity.audit.updatedBy })
        : null,
      deletedBy: entity.audit.deletedBy
        ? UserSchema.from({ id: entity.audit.deletedBy })
        : null,
    });
  }
}
