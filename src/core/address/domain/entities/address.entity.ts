import { Data } from '@shared/domain/decorators/data.decorator';
import { BaseEntity } from '@shared/domain/entity/baseEntity';
import { CityEntity } from '@core/cities/domain/entities/city.entity';

type AddressProps = {
  cep: string;
  neighborhood: string;
  street: string;
  number: string;
  complement?: string;
  latitude?: number;
  longitude?: number;
  city: CityEntity;
};

@Data()
export class AddressEntity extends BaseEntity<AddressProps> {}
