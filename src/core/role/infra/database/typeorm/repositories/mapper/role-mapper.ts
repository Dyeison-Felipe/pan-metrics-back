import { Injectable } from '@nestjs/common';
import { RepositoryMapper } from '../../../../../../../shared/infra/database/typeorm/repositories/mappers/repository-mapper';
import { Role } from '../../../../../domain/entities/role.entity';
import { RoleSchema } from '../../schema/role.schema';

@Injectable()
export class RoleMapper implements RepositoryMapper<RoleSchema, Role> {
  toEntity(schema: RoleSchema): Role {
    return Role.with({
      id: schema.id,
      name: schema.name,
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

  toSchema(entitie: Role): RoleSchema {
    return RoleSchema.with({
      id: entitie.id,
      name: entitie.name,
      createdAt: entitie.audit.createdAt,
      updatedAt: entitie.audit.updatedAt,
      deletedAt: entitie.audit.deletedAt,
      createdBy: entitie.audit.createdBy,
      updatedBy: entitie.audit.updatedBy,
      deletedBy: entitie.audit.deletedBy,
    });
  }
}
