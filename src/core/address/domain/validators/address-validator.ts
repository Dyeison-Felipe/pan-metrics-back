import { ClassValidatorFields } from '@/shared/domain/validators/class-validator-field';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';
import { AddressProps } from '../entities/address.entity';

export class AddressRules {
  @MaxLength(8)
  @IsString()
  @IsOptional()
  cep?: string ;

  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  neighborhood: string;

  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  street: string;

  @MaxLength(10)
  @IsString()
  @IsNotEmpty()
  number: string;

  @MaxLength(255)
  @IsString()
  @IsOptional()
  complement?: string;

  @IsNumber()
  @IsOptional()
  latitude?: number;

  @IsNumber()
  @IsOptional()
  longitude?: number;

  @IsUUID()
  @IsNotEmpty()
  cityId: string;

  @IsString()
  @IsNotEmpty()
  createdBy: string;

  @IsString()
  @IsNotEmpty()
  updatedBy: string;

  @IsOptional()
  deletedBy?: string | null;

  constructor(data: AddressProps) {
    Object.assign(this, data);
    this.cityId = data.city?.id;
  }
}

export class AddressValidator extends ClassValidatorFields<AddressRules> {
  validate(data: AddressProps): boolean {
    return super.validate(new AddressRules(data ?? {}));
  }
}

export class AddressValidatorFactory {
  static create(): AddressValidator {
    // Retorna a instância do AddressValidator
    return new AddressValidator();
  }
}
