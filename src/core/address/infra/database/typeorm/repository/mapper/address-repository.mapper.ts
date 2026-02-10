import { Inject, Injectable } from '@nestjs/common';
import { RepositoryMapper } from '@shared/infra/database/typeorm/repositories/base-mapper/repository-mapper';
import { AddressEntity } from '@core/address/domain/entities/address.entity';
import { AddressSchema } from '../../schema/address.schema';
import { CityMapper } from '@core/cities/infra/database/typeorm/repositories/mapper/city-mapper';
import { PROVIDERS } from '@shared/application/constants/providers';

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
      auditable: {
        createdAt: schema.createdAt,
        updatedAt: schema.updatedAt,
        deletedAt: schema.deletedAt,
        createdBy: schema.createdBy,
        updatedBy: schema.updatedBy,
        deletedBy: schema.deletedBy,
      },
      city: this.cityMapper.toEntity(schema.city),
    });
  }
  toSchema(entity: AddressEntity): AddressSchema {
    return AddressSchema.with({
      id: entity.id,
      cep: entity.props.cep,
      neighborhood: entity.props.neighborhood,
      street: entity.props.street,
      number: entity.props.number,
      complement: entity.props.complement,
      latitude: entity.props.latitude,
      longitude: entity.props.longitude,
      createdAt: entity.audit.createdAt,
      updatedAt: entity.audit.updatedAt,
      deletedAt: entity.audit.deletedAt,
      createdBy: entity.audit.createdBy,
      updatedBy: entity.audit.updatedBy,
      deletedBy: entity.audit.deletedBy,
      city: this.cityMapper.toSchema(entity.props.city),
    });
  }
}
