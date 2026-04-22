import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  Validate,
} from 'class-validator';
import { UserProps } from '../entities/user.entity';
import { ClassValidatorFields } from '@/shared/domain/validators/class-validator-field';

export class UserRules {
  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  username: string;

  @MaxLength(255)
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @MaxLength(100)
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @IsBoolean()
  @IsNotEmpty()
  active: boolean;

  @IsString()
  @IsNotEmpty()
  createdBy: string;

  @IsString()
  @IsNotEmpty()
  updatedBy: string;

  @IsOptional()
  deletedBy?: string | null;

  constructor(data: UserProps) {
    Object.assign(this, data);
  }
}

export class UserValidator extends ClassValidatorFields<UserRules> {
  validate(data: UserProps): boolean {
    return super.validate(new UserRules(data ?? {}));
  }
}

export class UserValidatorFactory {
  static create(): UserValidator {
    // Retorna a instância do UserValidator
    return new UserValidator();
  }
}
