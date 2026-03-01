import { Injectable } from '@nestjs/common';
import { RepositoryMapper } from '@shared/infra/database/typeorm/repositories/base-mapper/repository-mapper';
import { UserSchema } from '../../schema/user.schema';
import { UserEntity } from '@core/user/domain/entities/user.entity';

@Injectable()
export class UserRepositoryMapper implements RepositoryMapper<
  UserSchema,
  UserEntity
> {
  toEntity(schema: UserSchema): UserEntity {
    return new UserEntity({
      id: schema.id,
      username: schema.username,
      password: schema.password,
      active: schema.active,
      email: schema.email,
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
  toSchema(entity: UserEntity): UserSchema {
    return UserSchema.with({
      id: entity.id,
      username: entity.username,
      password: entity.password,
      active: entity.active,
      email: entity.email,
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
