import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ClassValidatorFields } from '@/shared/domain/validators/class-validator-field';
import { CompanyRules } from '@/core/company/domain/validators/company-validator';
import { RoleProps } from '../entities/role.entity';

export class RoleRules {
  @IsString()
  @MaxLength(255)
  @IsNotEmpty()
  name: string;

  @Type(() => CompanyRules)
  @IsNotEmpty()
  company: CompanyRules;

  @IsString()
  @IsNotEmpty()
  createdBy: string;

  @IsString()
  @IsNotEmpty()
  updatedBy: string;

  @IsOptional()
  deletedBy?: string | null;

  constructor(data: RoleProps) {
    Object.assign(this, data);
  }
}

export class RoleValidator extends ClassValidatorFields<RoleRules> {
  validate(data: RoleProps): boolean {
    return super.validate(new RoleRules(data ?? {}));
  }
}

export class RoleValidatorFactory {
  static create(): RoleValidator {
    // Retorna a instância do CompanyValidator
    return new RoleValidator();
  }
}
