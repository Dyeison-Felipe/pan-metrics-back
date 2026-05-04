import { Injectable } from '@nestjs/common';
import { StateEntity } from '@/core/states/domain/entities/state.entity';
import { StateSchema } from '../../schema/state.schema';

@Injectable()
export class StateMapper {
  static toEntity(schema: StateSchema): StateEntity {
    return new StateEntity({
      id: schema.id,
      name: schema.name,
      uf: schema.uf,
    });
  }

  static toSchema(entity: StateEntity): StateSchema {
    return StateSchema.with({
      id: entity.id,
      name: entity.name,
      uf: entity.uf,
    });
  }
}
