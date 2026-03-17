import { ID_USER_DEFAULT } from '@/shared/application/constants/id-user-default';
import { Data } from '@/shared/domain/decorators/data.decorator';
import { AuditableProps } from '@/shared/domain/entity/audit-entity-props';
import { BaseEntity } from '@/shared/domain/entity/baseEntity';

type PlanProps = {
  name: string;
  description: string;
  price: number;
  duration: string;
  auditable: AuditableProps
};

type CreatePlanProps = {
  name: string;
  description: string;
  price: number;
  duration: string;
  auditable?: Partial<AuditableProps>;
};

export interface PlanEntity extends PlanProps {}

@Data()
export class PlanEntity extends BaseEntity<PlanProps> {
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
      }
    })

    return planEntity;
  }
}
