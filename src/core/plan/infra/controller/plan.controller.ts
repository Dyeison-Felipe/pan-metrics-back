import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { CreatePlanUseCase } from "../../application/usecase/create-plan.usecase";
import { CreatePlanDto } from "../dtos/create-plan.dto";
import { CreatePlanPresenter } from "@/shared/infra/presenter/plan/create-plan.presenter";
import { ConvertPresenter } from "@/shared/infra/presenter/converter/converter.presenter";
import { AuthGuard } from "@/core/auth/infra/guard/auth.guard";

@Controller('/v1/plan')
export class PlanController {
  constructor(private readonly createPlanUseCase: CreatePlanUseCase) {}

  @UseGuards(AuthGuard)
  @Post()
  async create (@Body() body: CreatePlanDto): Promise<CreatePlanPresenter> {
    const output = await this.createPlanUseCase.execute(body);

    const presenter = ConvertPresenter.toPresenter(output, CreatePlanPresenter);

    return presenter;
  }
}