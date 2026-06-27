import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { CreatePlanUseCase } from "../../application/usecase/create-plan.usecase";
import { CreatePlanPresenter } from "@/shared/infra/presenter/plan/create-plan.presenter";
import { CreatePlanDto } from "../dtos/create-plan.dto";
import { UpdatePlanDto } from "../dtos/update-plan.usecase";
import { UpdatePlanPresenter } from "@/shared/infra/presenter/plan/update-plan.presenter";
import { UpdatePlanUseCase } from "../../application/usecase/update-plan.usecase";
import { FindAllPlanUseCase } from "../../application/usecase/find-all-plan.usecase";
import { ConvertPresenter } from "@/shared/infra/presenter/converter/converter.presenter";
import { FindAllPlanPresenter } from "@/shared/infra/presenter/plan/find-all-plan.presenter";
import { DeletePlanUseCase } from "../../application/usecase/delete.usecase";
import { Permission, Public } from "@/shared/infra/decorators/permission.decorator";
import { PermissionPlan } from "@/core/auth/domain/permissions-definition/plan";

@Controller('v1/plan')
export class PlanController {
  constructor(private readonly createPlanUseCase: CreatePlanUseCase, private readonly updatePlanUseCase: UpdatePlanUseCase, private readonly findAllPlanUseCase: FindAllPlanUseCase, private readonly deletePlanUseCase: DeletePlanUseCase
  ) { }

  @Post()
  @Permission(PermissionPlan.PLAN_CREATE)
  async create(@Body() dto: CreatePlanDto): Promise<CreatePlanPresenter> {
    return await this.createPlanUseCase.execute(dto);
    
  }

  @Put()
  
  async update(@Body() dto: UpdatePlanDto): Promise<UpdatePlanPresenter> {
    return await this.updatePlanUseCase.execute(dto);
  }

  @Get()
  @Public()
  async findAll(): Promise<FindAllPlanPresenter[]> {
    const output = await this.findAllPlanUseCase.execute();

    return ConvertPresenter.toPresenterList(output, FindAllPlanPresenter);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    await this.deletePlanUseCase.execute({ id })
  }
}