import { Inject, Injectable } from '@nestjs/common';
import { AddressSchema } from '../../schema/address.schema';
import { PROVIDERS } from '@/shared/application/constants/providers';
import { CityMapper } from '@/core/cities/infra/database/typeorm/repositories/mapper/city-mapper';
import { AddressEntity } from '@/core/address/domain/entities/address.entity';
import { UserSchema } from '@/core/user/infra/database/typeorm/schema/user.schema';

@Injectable()
export class AddressRepositoryMapper {
  static toEntity(schema: AddressSchema): AddressEntity {
    return new AddressEntity({
      id: schema.id,
      cep: schema.cep,
      neighborhood: schema.neighborhood,
      street: schema.street,
      number: schema.number,
      complement: schema.complement,
      latitude: schema.latitude,
      longitude: schema.longitude,
      city: CityMapper.toEntity(schema.city),
      auditable: {
        createdAt: schema.createdAt,
        updatedAt: schema.updatedAt,
        deletedAt: schema.deletedAt,
      },
      createdBy: schema.createdBy?.id,
      updatedBy: schema.updatedBy?.id,
      deletedBy: schema.deletedBy?.id,
    });
  }
  static toSchema(entity: AddressEntity): AddressSchema {
    return AddressSchema.with({
      id: entity.id,
      cep: entity.cep,
      neighborhood: entity.neighborhood,
      street: entity.street,
      number: entity.number,
      complement: entity.complement,
      latitude: entity.latitude,
      longitude: entity.longitude,
      createdAt: entity.auditable?.createdAt,
      updatedAt: entity.auditable?.updatedAt,
      deletedAt: entity.auditable?.deletedAt,
      createdBy: UserSchema.from({ id: entity.createdBy }),
      updatedBy: UserSchema.from({ id: entity.updatedBy }),
      deletedBy: entity.deletedBy
        ? UserSchema.from({ id: entity.deletedBy })
        : null,
      city: CityMapper.toSchema(entity.props.city),
    });
  }
}
