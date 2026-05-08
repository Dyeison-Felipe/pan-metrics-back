import { PROVIDERS } from "@/shared/application/constants/providers";
import { UseCase } from "@/shared/application/usecase/usecase";
import { Inject } from "@nestjs/common";
import { PlanRepository } from "../../domain/repositories/plan.repository";
import { ConflictError } from "@/shared/application/errors/conflict-error";
import { UpdatePlanOutput } from "@/shared/application/output/plan/update-plan.output";
import { PlanOutput } from "@/shared/application/output/plan/plan.output";

type Input = { id: string };

type Output = void

export class DeletePlanUseCase implements UseCase<Input, Output> {
  constructor(@Inject(PROVIDERS.PLAN_REPOSITORY) private readonly planRepository: PlanRepository) { }

  async execute({ id }: Input): Promise<Output> {
    const plan = await this.planRepository.findById(id);

    if (!plan) {
      throw new ConflictError(`Plano não encontrado`);
    }

    plan.deleted();

    await this.planRepository.update(plan);

  }
}