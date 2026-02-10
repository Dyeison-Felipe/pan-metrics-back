import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateAddressDto {
  @ApiProperty({ description: 'Cep da rua', maxLength: 8 })
  @IsString()
  @IsNotEmpty()
  @MaxLength(8)
  cep: string;

  @ApiProperty({ description: 'Nome do bairro', maxLength: 255 })
  @IsString()
  @IsNotEmpty()
  neighborhood: string;

  @ApiProperty({ description: 'Nome da rua', maxLength: 255 })
  @IsString()
  @IsNotEmpty()
  street: string;

  @ApiProperty({ description: 'numero do endereço', maxLength: 10 })
  @IsString()
  @IsNotEmpty()
  @MaxLength(10)
  number: string;

  @ApiPropertyOptional({ description: 'Complemento do endereço', maxLength: 255 })
  @IsString()
  @IsOptional()
  complement?: string;

  @ApiPropertyOptional({ description: 'Latitude do endereço', maxLength: 10 })
  @IsNumber()
  @IsOptional()
  latitude?: number;

  @ApiPropertyOptional({ description: 'Longitude do endereço', maxLength: 10 })
  @IsNumber()
  @IsOptional()
  longitude?: number;

  @ApiProperty({ description: 'Código da cidade', maxLength: 40 })
  @IsString()
  @IsNotEmpty()
  @MaxLength(40)
  cityId: string;
}
