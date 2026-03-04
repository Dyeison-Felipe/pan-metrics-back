import { BaseRepository } from "@shared/domain/repository/base-repository";
import { PlanEntity } from "../entity/plan.entity";

export interface PlanRespository extends BaseRepository<PlanEntity> {}