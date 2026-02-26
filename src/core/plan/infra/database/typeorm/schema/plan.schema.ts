import { BaseSchema } from "@shared/infra/database/typeorm/schema/baseSchema/baseSchema";
import { Column } from "typeorm";

export class PlanSchema extends BaseSchema {
  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @Column()
  duration: number;
}