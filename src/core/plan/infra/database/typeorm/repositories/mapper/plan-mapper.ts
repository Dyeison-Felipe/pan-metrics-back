import { Plan } from "@/core/plan/domain/entities/plan.entity";
import { Injectable } from "@nestjs/common";
import { PlanSchema } from "../../schema/plan.schema";

@Injectable()
export class PlanMapper {
  static toEntity(schema: PlanSchema): Plan {
    return new Plan({
      id: schema.id,
      name: schema.name,
      price: schema.price,
      description: schema.description,
      active: schema.active,
      duration: schema.duration,
      auditable: {
        createdAt: schema.createdAt,
        updatedAt: schema.updatedAt,
        deletedAt: schema.deletedAt,
      }
    })
  }

  static toSchema(entity: Plan): PlanSchema {
    return PlanSchema.with({
      id: entity.id,
      name: entity.name,
      price: entity.price,
      description: entity.description,
      active: entity.active,
      duration: entity.description,
      createdAt: entity.auditable?.createdAt,
      updatedAt: entity.auditable?.updatedAt,
      deletedAt: entity.auditable?.deletedAt,
    })
  }
}