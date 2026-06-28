import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';

export class CreateAddressDto {
  @ApiPropertyOptional({ description: 'CEP da rua', maxLength: 8, example: '85.532-423' })
  @IsString()
  @IsOptional()
  @MaxLength(8)
  cep?: string;

  @ApiProperty({ description: 'Nome do bairro', maxLength: 255, example: 'Centro' })
  @IsString()
  @IsNotEmpty()
  neighborhood: string;

  @ApiProperty({ description: 'Nome da rua', maxLength: 255, example: 'Rua Catedral' })
  @IsString()
  @IsNotEmpty()
  street: string;

  @ApiProperty({ description: 'Número do endereço', maxLength: 10, example: '130' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(10)
  number: string;

  @ApiPropertyOptional({
    description: 'Complemento do endereço',
    maxLength: 255,
    example: 'Casa na cor azul com telhado no portão'
  })
  @IsString()
  @IsOptional()
  complement?: string;

  @ApiPropertyOptional({ description: 'Latitude do endereço', example: 37.4267861 })
  @IsNumber()
  @IsOptional()
  latitude?: number;

  @ApiPropertyOptional({ description: 'Longitude do endereço', example: -122.0806032 })
  @IsNumber()
  @IsOptional()
  longitude?: number;

  @ApiProperty({ description: 'ID da cidade', maxLength: 40, example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479', })
  @IsUUID()
  @IsNotEmpty()
  @MaxLength(40)
  cityId: string;
}
