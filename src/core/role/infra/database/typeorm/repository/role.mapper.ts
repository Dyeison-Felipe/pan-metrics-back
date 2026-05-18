import { Role } from '@/core/role/domain/entities/role.entity';
import { RoleSchema } from '../schema/role.schema';
import { CompanyRepositoryMapper } from '@/core/company/infra/database/typeorm/repository/company-repository.mapper';
import { UserSchema } from '@/core/user/infra/database/typeorm/schema/user.schema';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RoleRepositoryMapper {
  static toEntity(schema: RoleSchema): Role {
    const role = new Role({
      id: schema.id,
      name: schema.name,
      company: CompanyRepositoryMapper.toEntity(schema.company),
      createdBy: schema.createdBy.id,
      updatedBy: schema.updatedBy.id,
      deletedBy: schema.deletedBy?.id,
      auditable: {
        createdAt: schema.createdAt,
        updatedAt: schema.updatedAt,
        deletedAt: schema.deletedAt,
      },
    });

    return role;
  }

  static toSchema(entity: Role): RoleSchema {
    const schema = RoleSchema.from({
      id: entity.id,
      name: entity.name,
      company: CompanyRepositoryMapper.toSchema(entity.company),
      createdAt: entity.auditable?.createdAt,
      updatedAt: entity.auditable?.updatedAt,
      deletedAt: entity.auditable?.deletedAt,
      createdBy: UserSchema.from({ id: entity.createdBy }),
      updatedBy: UserSchema.from({ id: entity.updatedBy }),
      deletedBy: entity.deletedBy
        ? UserSchema.from({ id: entity.deletedBy })
        : null,
    });

    return schema;
  }
}
