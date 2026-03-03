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
    });
  }
  toSchema(entity: PermissionEntity): PermissionSchema {
    return PermissionSchema.with({
      id: entity.id,
      resource: entity.resource,
    });
  }
}
