import { Inject, Injectable } from '@nestjs/common';
import { RepositoryMapper } from '../../../../../../../shared/infra/database/typeorm/repositories/base-mapper/repository-mapper';
import { CitySchema } from '../../schema/city.schema';
import { CityEntity } from '@core/cities/domain/entities/city.entity';
import { StateMapper } from '../../../../../../states/infra/database/typeorm/repositories/mapper/state-mapper';
import { PROVIDERS } from '@shared/application/constants/providers';
import { UserSchema } from '@core/user/infra/database/typeorm/schema/user.schema';

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
  toSchema(entity: CityEntity): CitySchema {
    return CitySchema.with({
      id: entity.id,
      name: entity.name,
      state: this.stateMapper.toSchema(entity.props.state),
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
