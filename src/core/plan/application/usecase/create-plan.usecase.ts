import { PROVIDERS } from "@/shared/application/constants/providers";
import { UseCase } from "@/shared/application/usecase/usecase";
import { Inject } from "@nestjs/common";
import { PlanRepository } from "../../domain/repositories/plan.repository";
import { CreatePlanInput } from "@/shared/application/input/plan/create-plan.input";
import { CreatePlanOutput } from "@/shared/application/output/plan/create-plan.output";
import { ConflictError } from "@/shared/application/errors/conflict-error";
import { Plan } from "../../domain/entities/plan.entity";

type Input = CreatePlanInput

type Output = CreatePlanOutput

export class CreatePlanUseCase implements UseCase<Input, Output> {
  constructor(@Inject(PROVIDERS.PLAN_REPOSITORY) private readonly planRepository: PlanRepository) { }

  async execute(input: Input): Promise<Output> {
    const existPlan = await this.planRepository.findByName(input.name);

    if (existPlan) {
      throw new ConflictError(`Já existe um plano com o nome ${input.name}`);
    }

    const createPlan = Plan.create({
      name: input.name,
      price: input.price,
      description: input.description,
      duration: input.duration
    })

    const savedPlan = await this.planRepository.save(createPlan);

    const output: Output = {
      id: savedPlan.id,
      name: savedPlan.name,
      price: savedPlan.price,
      active: savedPlan.active,
      description: savedPlan.description,
      duration: savedPlan.duration,
    }

    return output;
  }
}