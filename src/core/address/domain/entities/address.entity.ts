import { Data } from '@shared/domain/decorators/data.decorator';
import { BaseEntity } from '@shared/domain/entity/baseEntity';
import { CityEntity } from '@core/cities/domain/entities/city.entity';
import { AuditableProps } from '@shared/domain/entity/audit-entity-props';
import { ID_USER_DEFAULT } from '@shared/application/constants/id-user-default';

type AddressProps = {
  cep: string;
  neighborhood: string;
  street: string;
  number: string;
  complement?: string;
  latitude?: number;
  longitude?: number;
  city: CityEntity;
  auditable : AuditableProps
};

type CreateAddressProps = AddressProps;

type UpdateAddressProps = Partial<AddressProps>;

export interface AddressEntity extends AddressProps {};

@Data()
export class AddressEntity extends BaseEntity<AddressProps> {
  static create(props: CreateAddressProps): AddressEntity {
    return new AddressEntity({
      id: crypto.randomUUID(),
      cep: props.cep,
      neighborhood: props.neighborhood,
      street: props.street,
      number: props.number,
      complement: props.complement,
      latitude: props.latitude,
      longitude: props.longitude,
      city: props.city,
      auditable: {
        createdAt: props.auditable.createdAt ?? new Date(),
        updatedAt: props.auditable.updatedAt ?? new Date(),
        deletedAt: props.auditable.deletedAt ?? null,
        createdBy: props.auditable.createdBy ?? ID_USER_DEFAULT,
        updatedBy: props.auditable.updatedBy ?? ID_USER_DEFAULT,
        deletedBy: props.auditable.deletedBy ?? null
      }
    })
  }
}
