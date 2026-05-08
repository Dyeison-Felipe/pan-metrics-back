import { BaseRepository } from "@/shared/domain/repository/base-repository";
import { Plan } from "../entities/plan.entity";

export interface PlanRepository extends BaseRepository<Plan> {
  findByName(name: string): Promise<Plan | null>
  findAll(): Promise<Plan[]>;
}