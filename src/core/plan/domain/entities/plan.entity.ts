import { Data } from '@/shared/domain/decorators/data.decorator';
import { BaseEntity } from '@/shared/domain/entity/baseEntity';
import { PlanValidatorFactory } from '../validators/plan-validate';
import { EntityValidationError } from '@/shared/application/errors/validation-error';

export type PlanProps = {
  name: string;
  price: number;
  active: boolean;
  description: string;
};

type CreatePlanProps = {
  name: string;
  price: number;
  description: string;
};

type UpdatePlanProps = {
  name: string;
  price: number;
  active: boolean;
  description: string;
};

export interface Plan extends PlanProps {}

@Data()
export class Plan extends BaseEntity<PlanProps> {
  static create(props: CreatePlanProps): Plan {
    return new Plan({
      id: crypto.randomUUID(),
      name: props.name,
      price: props.price,
      active: true,
      description: props.description,
    });
  }

  update(props: UpdatePlanProps): void {
    this.name = props.name;
    this.price = props.price;
    this.description = props.description;
    this.active = props.active;
  }

  protected validate() {
    const validator = PlanValidatorFactory.create();

    const isValid = validator.validate(this.props);

    if (!isValid) {
      throw new EntityValidationError(validator.errors);
    }
  }
}
