import { Body, Controller, Post } from "@nestjs/common";
import { CreatePlanUseCase } from "../../application/usecase/create-plan.usecase";
import { CreatePlanPresenter } from "@/shared/infra/presenter/plan/create-plan.presenter";
import { CreatePlanDto } from "../dtos/create-plan.dto";

@Controller('v1/plan')
export class PlanController {
  constructor(private readonly createPlanUseCase: CreatePlanUseCase) { }

  @Post()
  async create(@Body() dto: CreatePlanDto): Promise<CreatePlanPresenter> {
    return await this.createPlanUseCase.execute(dto);
  }
}