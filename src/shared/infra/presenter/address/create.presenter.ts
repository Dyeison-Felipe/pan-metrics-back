import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { CityPresenter } from '../city/city.presenter';

export class CreateAddressPresenter {
  @ApiProperty({ description: 'Id do endereço' })
  readonly id: string;

  @ApiProperty({ description: 'Cep do endereço' })
  readonly cep: string;

  @ApiProperty({ description: 'bairro do endereço' })
  readonly neighborhood: string;

  @ApiProperty({ description: 'Rua do endereço' })
  readonly street: string;

  @ApiProperty({ description: 'numero do endereço' })
  readonly number: string;

  @ApiPropertyOptional({ description: 'Complemento do endereço' })
  readonly complement?: string | null;

  @ApiPropertyOptional({ description: 'Latitude do endereço' })
  readonly latitude?: number | null;

  @ApiPropertyOptional({ description: 'Longitude do endereço' })
  readonly longitude?: number | null;

  @ApiProperty({ description: 'Objeto da cidade do endereço' })
  readonly city: CityPresenter;

  constructor(props: CreateAddressPresenter) {
    this.id = props.id;
    this.cep = props.cep;
    this.neighborhood = props.neighborhood;
    this.street = props.street;
    this.number = props.number;
    this.complement = props.complement;
    this.latitude = props.latitude;
    this.longitude = props.longitude;
    this.city = props.city;
  }
}
