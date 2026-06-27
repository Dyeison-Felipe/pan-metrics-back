import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
} from 'class-validator';
import { ClassValidatorFields } from '@/shared/domain/validators/class-validator-field';
import { PermissionProps } from '../entity/permission.entity';

export class PermissionRules {
  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  action: string;

  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  subject: string;

  constructor(data: PermissionProps) {
    Object.assign(this, data);
  }
}

export class PermissionValidator extends ClassValidatorFields<PermissionRules> {
  validate(data: PermissionProps): boolean {
    return super.validate(new PermissionRules(data ?? {}));
  }
}

export class PermissionValidatorFactory {
  static create(): PermissionValidator {
    // Retorna a instância do PlanValidator
    return new PermissionValidator();
  }
}
