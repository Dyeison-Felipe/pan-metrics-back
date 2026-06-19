import { PlanRules } from '@/core/plan/domain/validators/plan-validate';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { PlanOptionProps } from '../entity/plan-option.entity';
import { ClassValidatorFields } from '@/shared/domain/validators/class-validator-field';

export class PlanOptionRules {
  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  option: string;

  @Type(() => PlanRules)
  @IsNotEmpty()
  address: PlanRules;

  constructor(data: PlanOptionProps) {
    Object.assign(this, data);
  }
}

export class PlanOptionValidator extends ClassValidatorFields<PlanOptionRules> {
  validate(data: PlanOptionProps): boolean {
    return super.validate(new PlanOptionRules(data ?? {}));
  }
}

export class PlanOptionValidatorFactory {
  static create(): PlanOptionValidator {
    // Retorna a instância do PlanOptionValidator
    return new PlanOptionValidator();
  }
}
