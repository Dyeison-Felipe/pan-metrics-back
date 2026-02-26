import { FindAllPermissionsUseCase } from '@core/permissions/application/usecase/find-all-permissions';
import { Controller, Get } from '@nestjs/common';
import { ConvertPresenter } from '@shared/infra/presenter/converter/converter.presenter';
import { FindAllPermission } from '@shared/infra/presenter/permission/find-all-permission.presenter';

@Controller('permission/v1')
export class PermissionController {
  constructor(
    private readonly findAllPermissionsUseCase: FindAllPermissionsUseCase,
  ) {}

  @Get('/find-all')
  async findAllPermission(): Promise<FindAllPermission[]> {
    const execute = await this.findAllPermissionsUseCase.execute();

    const presenter = ConvertPresenter.toPresenterList(
      execute,
      FindAllPermission,
    );

    return presenter;
  }
}
