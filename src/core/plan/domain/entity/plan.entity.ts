import { ID_USER_DEFAULT } from '@/shared/application/constants/id-user-default';
import { Data } from '@/shared/domain/decorators/data.decorator';
import { AuditableProps } from '@/shared/domain/entity/audit-entity-props';
import { BaseEntity } from '@/shared/domain/entity/baseEntity';

type PlanProps = {
  name: string;
  description: string;
  price: number;
  duration: string;
  auditable: AuditableProps;
};

type CreatePlanProps = {
  name: string;
  description: string;
  price: number;
  duration: string;
  auditable?: Partial<AuditableProps>;
};

type UpdatePlanProps = {
  name: string;
  description: string;
  price: number;
  duration: string;
  auditable?: Partial<AuditableProps>;
};

export interface PlanEntity extends PlanProps {}

@Data()
export class PlanEntity extends BaseEntity<PlanProps> {
  /**
   * Create a new plan entity with the given props.
   * @param {CreatePlanProps} props - The props to create the plan entity with.
   * @returns {PlanEntity} - The created plan entity.
   */
  static create(props: CreatePlanProps): PlanEntity {
    const planEntity = new PlanEntity({
      id: crypto.randomUUID(),
      name: props.name,
      description: props.description,
      duration: props.duration,
      price: props.price,
      auditable: {
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
        createdBy: props.auditable?.createdBy ?? ID_USER_DEFAULT,
        updatedBy: props.auditable?.updatedBy ?? ID_USER_DEFAULT,
        deletedBy: null,
      },
    });

    return planEntity;
  }

  /**
   * Update a plan entity with the given props.
   * @param {UpdatePlanProps} props - The props to update the plan entity with.
   */
  update(props: UpdatePlanProps): void {
    this.name = props.name;
    this.description = props.description;
    this.price = props.price;
    this.duration = props.duration;
    this.auditable.updatedAt = new Date();
    this.auditable.updatedBy = props.auditable?.updatedBy ?? ID_USER_DEFAULT;
  }
}
