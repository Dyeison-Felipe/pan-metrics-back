import { PermissionSchema } from '../../schema/permission.schema';
import { PermissionEntity } from '@/core/permissions/domain/entity/permission.entity';

export class PermissionRepositoryMappper {
  static toEntity(schema: PermissionSchema): PermissionEntity {
    return new PermissionEntity({
      id: schema.id,
      action: schema.action,
      subject: schema.subject,
    });
  }
  static toSchema(entity: PermissionEntity): PermissionSchema {
    return PermissionSchema.with({
      id: entity.id,
      action: entity.action,
      subject: entity.action,
    });
  }
}
