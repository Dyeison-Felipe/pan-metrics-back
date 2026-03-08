import { RepositoryMapper } from '@/shared/infra/database/typeorm/repositories/base-mapper/repository-mapper';
import { Inject, Injectable } from '@nestjs/common';
import { CitySchema } from '../../schema/city.schema';
import { CityEntity } from '@/core/cities/domain/entities/city.entity';
import { StateMapper } from '@/core/states/infra/database/typeorm/repositories/mapper/state-mapper';
import { PROVIDERS } from '@/shared/application/constants/providers';

@Injectable()
export class CityMapper implements RepositoryMapper<CitySchema, CityEntity> {
  constructor(
    @Inject(PROVIDERS.STATE_MAPPER) private readonly stateMapper: StateMapper,
  ) {}

  toEntity(schema: CitySchema): CityEntity {
    return new CityEntity({
      id: schema.id,
      name: schema.name,
      state: this.stateMapper.toEntity(schema.state),
    });
  }
  toSchema(entity: CityEntity): CitySchema {
    return CitySchema.with({
      id: entity.id,
      name: entity.name,
      state: this.stateMapper.toSchema(entity.props.state),
    });
  }
}
