import { StateEntity } from '@shared/domain/entity/state.entity';
import { StateSchema } from '../../schema/state.schema';
import { RepositoryMapper } from './base-mapper/repository-mapper';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class StateMapper implements RepositoryMapper<StateSchema, StateEntity> {

  toEntity(schema: StateSchema): StateEntity {
    return StateEntity.with({
      id: schema.id,
      name: schema.name,
      uf: schema.uf,
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
  toSchema(entitie: StateEntity): StateSchema {
    return StateSchema.with({
        id: entitie.id,
        name: entitie.props.name,
        uf: entitie.props.uf, 
        createdAt: entitie.audit.createdAt,
        updatedAt: entitie.audit.updatedAt,
        deletedAt: entitie.audit.deletedAt,
        createdBy: entitie.audit.createdBy,
        updatedBy: entitie.audit.updatedBy,
        deletedBy: entitie.audit.deletedBy,
    })
  }
}
