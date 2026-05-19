import { CreateAddressDto } from '@/core/address/infra/dtos/create-address.dto';
import { CreateUserCompanyDto } from './create-user-company.dto';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsUUID,
  MaxLength,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateCompanyDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  fantasyName: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  socialReazon: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(14)
  cnpj: string;

  @IsEmail()
  @IsNotEmpty()
  @MaxLength(255)
  email: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(11)
  phoneNumber: string;

  @ValidateNested()
  @Type(() => CreateAddressDto)
  address: CreateAddressDto;

  @IsUUID()
  @IsNotEmpty()
  plan: string;

  @ValidateNested()
  @Type(() => CreateUserCompanyDto)
  user: CreateUserCompanyDto;
}
