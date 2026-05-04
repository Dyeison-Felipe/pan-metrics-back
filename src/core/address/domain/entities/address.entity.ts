import { CityEntity } from '@/core/cities/domain/entities/city.entity';
import { ID_USER_DEFAULT } from '@/shared/application/constants/id-user-default';
import { Data } from '@/shared/domain/decorators/data.decorator';
import { BaseEntity } from '@/shared/domain/entity/baseEntity';

type AddressProps = {
  cep: string;
  neighborhood: string;
  street: string;
  number: string;
  complement?: string;
  latitude?: number;
  longitude?: number;
  city: CityEntity;
  createdBy: string;
  updatedBy: string;
  deletedBy?: string | null;
};

type CreateAddressProps = {
  cep: string;
  neighborhood: string;
  street: string;
  number: string;
  complement?: string;
  latitude?: number;
  longitude?: number;
  city: CityEntity;
  createdBy: string;
  updatedBy: string;
};

type UpdateAddressProps = Partial<AddressProps>;

export interface AddressEntity extends AddressProps {}

@Data()
export class AddressEntity extends BaseEntity<AddressProps> {
  protected validate(): void {
    throw new Error('Method not implemented.');
  }
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
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      createdBy: props?.createdBy ?? ID_USER_DEFAULT,
      updatedBy: props?.updatedBy ?? ID_USER_DEFAULT,
    });
  }
}
