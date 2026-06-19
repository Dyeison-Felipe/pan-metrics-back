import { PlanSchema } from "@/core/plan/infra/database/typeorm/schema/plan.schema";
import { BaseSchema } from "@/shared/infra/database/typeorm/schema/baseSchema/baseSchema";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";

@Entity('plan_option')
export class PlanOptionSchema extends BaseSchema {
  @Column({name: 'option', type: 'varchar', nullable: false})
  option: string;

  @ManyToOne(() => PlanSchema, (plan) => plan.planOption)
  @JoinColumn({name: 'plan', })
  plan: PlanSchema;
}