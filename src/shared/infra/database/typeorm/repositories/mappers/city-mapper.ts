import { Inject, Injectable } from '@nestjs/common';
import { RepositoryMapper } from './base-mapper/repository-mapper';
import { CitySchema } from '../../schema/city.schema';
import { CityEntity } from '@shared/domain/entity/city.entity';
import { StateMapper } from './state-mapper';
import { PROVIDERS } from '@shared/application/constants/providers';

@Injectable()
export class CityMapper implements RepositoryMapper<CitySchema, CityEntity> {
  constructor(
    @Inject(PROVIDERS.STATE_MAPPER) private readonly stateMapper: StateMapper,
  ) {}

  toEntity(schema: CitySchema): CityEntity {
    return CityEntity.with({
      id: schema.id,
      city: schema.city,
      state: this.stateMapper.toEntity(schema.state),
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
  toSchema(entitie: CityEntity): CitySchema {
    return CitySchema.with({
      id: entitie.id,
      city: entitie.props.city,
      state: this.stateMapper.toSchema(entitie.props.state),
      createdAt: entitie.audit.createdAt,
      updatedAt: entitie.audit.updatedAt,
      deletedAt: entitie.audit.deletedAt,
      createdBy: entitie.audit.createdBy,
      updatedBy: entitie.audit.updatedBy,
      deletedBy: entitie.audit.deletedBy,
    });
  }
}
