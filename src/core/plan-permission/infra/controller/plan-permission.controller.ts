import { Controller, Get } from "@nestjs/common";
import { FindAllPlanAndPermissionsUseCase } from "../../application/usecase/find-all-plan-and-permissions.usecase";
import { PlanPermissionPresenter } from "@/shared/infra/presenter/plan-permissions/plan.permission.presenter";
import { Public } from "@/shared/infra/decorators/permission.decorator";

@Controller('v1/plan-permission')
export class PlanPermissionController {
  constructor(private readonly findAllPlanAndPermissionsUseCase: FindAllPlanAndPermissionsUseCase) {}

  @Get()
  @Public()
  async findAll(): Promise<PlanPermissionPresenter[]> {
    return await this.findAllPlanAndPermissionsUseCase.execute();
  }

}