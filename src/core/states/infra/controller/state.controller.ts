import { Controller, Get, Query } from '@nestjs/common';
import { FindAllStateUseCase } from '../../application/usecase/find-all-state.usecase';
import {
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { PaginationPresenter } from '@/shared/infra/presenter/pagination/pagination.presenter';
import { StatePresenter } from '@/shared/infra/presenter/state/state.presenter';
import { ConvertPresenter } from '@/shared/infra/presenter/converter/converter.presenter';
import { Permission, Public } from '@/shared/infra/decorators/permission.decorator';
import { PermissionState } from '@/core/auth/domain/permissions-definition/state';

@ApiTags('State')
@Controller('/v1/state')
export class StateController {
  constructor(private readonly findAllStateUseCase: FindAllStateUseCase) {}

  @Get()
  @Permission(PermissionState.STATE_RERDER)
  @ApiOperation({ summary: 'Lista todos os estados e pesquisa por nome' })
  @ApiQuery({
    name: 's',
    required: false,
    description: 'Termo de busca pelo nome do estado ou pela sigla',
    example: 'São Paulo, Paraná, PR, SP',
  })
  @ApiOkResponse({
    description: 'Estados escontrado com sucesso',
    type: StatePresenter,
    isArray: true,
  })
  @ApiNotFoundResponse({ description: 'Nenhum estado encontrado' })
  @ApiInternalServerErrorResponse({ description: 'Erro interno do servidor' })
  async search(@Query('s') search: string = ''): Promise<StatePresenter[]> {
    const pagination = await this.findAllStateUseCase.execute({ search });

    const outputList = ConvertPresenter.toPresenterList(
      pagination,
      StatePresenter,
    );

    return outputList;
  }
}
