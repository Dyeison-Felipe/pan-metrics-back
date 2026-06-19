import { Plan } from '@/core/plan/domain/entities/plan.entity';
import { Data } from '@/shared/domain/decorators/data.decorator';
import { BaseEntity } from '@/shared/domain/entity/base-entity';
import { PlanOptionValidatorFactory } from '../validators/plan-option-validate';
import { EntityValidationError } from '@/shared/application/errors/validation-error';

export type PlanOptionProps = {
  option: string;
  plan: Plan;
};

export type CreatePlanOptionProps = {
  option: string;
  plan: Plan;
};

export type UpdatePlanOptionProps = {
  option: string;
};

export interface PlanOption extends PlanOptionProps {}

@Data()
export class PlanOption extends BaseEntity<PlanOptionProps> {
  static create(props: CreatePlanOptionProps): PlanOption {
    return new PlanOption({
      id: crypto.randomUUID(),
      option: props.option,
      plan: props.plan,
      auditable: {
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
    });
  }

  update(props: UpdatePlanOptionProps): void {
    this.option = props.option;
  }

  protected validate(): void {
    const validator = PlanOptionValidatorFactory.create();

    const isValid = validator.validate(this.props);
    if (!isValid) {
      throw new EntityValidationError(validator.errors);
    }
  }
}
