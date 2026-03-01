import { StateSchema } from '../../schema/state.schema';
import { RepositoryMapper } from '../../../../../../../shared/infra/database/typeorm/repositories/base-mapper/repository-mapper';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { StateEntity } from '@core/states/domain/entities/state.entity';
import { UserSchema } from '@core/user/infra/database/typeorm/schema/user.schema';

@Injectable()
export class StateMapper implements RepositoryMapper<StateSchema, StateEntity> {
  toEntity(schema: StateSchema): StateEntity {
    return new StateEntity({
      id: schema.id,
      name: schema.name,
      uf: schema.uf,
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
  toSchema(entity: StateEntity): StateSchema {
    return StateSchema.with({
      id: entity.id,
      name: entity.props.name,
      uf: entity.props.uf,
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
