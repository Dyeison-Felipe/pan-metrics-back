import { RepositoryMapper } from '@shared/infra/database/typeorm/repositories/base-mapper/repository-mapper';
import { PermissionSchema } from '../../schema/permission.schema';
import { PermissionEntity } from '@core/permissions/domain/entity/permission.entity';

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
        createdBy: schema.createdBy,
        updatedBy: schema.updatedBy,
        deletedBy: schema.deletedBy,
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
      createdBy: entity.audit.createdBy,
      updatedBy: entity.audit.updatedBy,
      deletedBy: entity.audit.deletedBy,
    });
  }
}
