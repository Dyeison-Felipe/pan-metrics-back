import { Inject, Injectable } from '@nestjs/common';
import { CitySchema } from '../../schema/city.schema';
import { CityEntity } from '@/core/cities/domain/entities/city.entity';
import { StateMapper } from '@/core/states/infra/database/typeorm/repositories/mapper/state-mapper';

@Injectable()
export class CityMapper {

  static toEntity(schema: CitySchema): CityEntity {
    return new CityEntity({
      id: schema.id,
      name: schema.name,
      state: StateMapper.toEntity(schema.state),
    });
  }
  static toSchema(entity: CityEntity): CitySchema {
    return CitySchema.with({
      id: entity.id,
      name: entity.name,
      state: StateMapper.toSchema(entity.state),
    });
  }
}
