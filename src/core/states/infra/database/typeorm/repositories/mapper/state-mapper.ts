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
    });
  }
  toSchema(entity: StateEntity): StateSchema {
    return StateSchema.with({
      id: entity.id,
      name: entity.props.name,
      uf: entity.props.uf,
    });
  }
}
