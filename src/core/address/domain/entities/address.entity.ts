import { CityEntity } from '@/core/cities/domain/entities/city.entity';
import { ID_USER_DEFAULT } from '@/shared/application/constants/id-user-default';
import { Data } from '@/shared/domain/decorators/data.decorator';
import { BaseEntity } from '@/shared/domain/entity/base-entity';
import { AddressValidatorFactory } from '../validators/address-validator';
import { EntityValidationError } from '@/shared/application/errors/validation-error';

export type AddressProps = {
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

export interface Address extends AddressProps {}

@Data()
export class Address extends BaseEntity<AddressProps> {
  static create(props: CreateAddressProps): Address {
    return new Address({
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

  protected validate(): void {
    const validator = AddressValidatorFactory.create();

    const isValid = validator.validate(this.props);
    if (!isValid) {
      console.log('Validation errors:', JSON.stringify(validator.errors, null, 2));
      throw new EntityValidationError(validator.errors);
    }
  }
}
