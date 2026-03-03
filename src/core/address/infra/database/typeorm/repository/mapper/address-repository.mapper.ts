import { Inject, Injectable } from '@nestjs/common';
import { RepositoryMapper } from '@shared/infra/database/typeorm/repositories/base-mapper/repository-mapper';
import { AddressEntity } from '@core/address/domain/entities/address.entity';
import { AddressSchema } from '../../schema/address.schema';
import { CityMapper } from '@core/cities/infra/database/typeorm/repositories/mapper/city-mapper';
import { PROVIDERS } from '@shared/application/constants/providers';
import { UserSchema } from '@core/user/infra/database/typeorm/schema/user.schema';

@Injectable()
export class AddressRepositoryMapper implements RepositoryMapper<
  AddressSchema,
  AddressEntity
> {
  constructor(
    @Inject(PROVIDERS.CITY_MAPPER) private readonly cityMapper: CityMapper,
  ) {}
  toEntity(schema: AddressSchema): AddressEntity {
    return new AddressEntity({
      id: schema.id,
      cep: schema.cep,
      neighborhood: schema.neighborhood,
      street: schema.street,
      number: schema.number,
      complement: schema.complement,
      latitude: schema.latitude,
      longitude: schema.longitude,
      city: this.cityMapper.toEntity(schema.city),
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
  toSchema(entity: AddressEntity): AddressSchema {
    return AddressSchema.with({
      id: entity.id,
      cep: entity.cep,
      neighborhood: entity.neighborhood,
      street: entity.street,
      number: entity.number,
      complement: entity.complement,
      latitude: entity.latitude,
      longitude: entity.longitude,
      createdAt: entity.auditable.createdAt,
      updatedAt: entity.auditable.updatedAt,
      deletedAt: entity.auditable.deletedAt,
      createdBy: UserSchema.from({ id: entity.auditable.createdBy }),
      updatedBy: UserSchema.from({ id: entity.auditable.updatedBy }),
      deletedBy: entity.auditable.deletedBy
        ? UserSchema.from({ id: entity.auditable.deletedBy })
        : null,
      city: this.cityMapper.toSchema(entity.props.city),
    });
  }
}
