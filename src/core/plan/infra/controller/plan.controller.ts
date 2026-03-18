import { Body, Controller, Post, Put, UseGuards } from '@nestjs/common';
import { CreatePlanUseCase } from '../../application/usecase/create-plan.usecase';
import { CreatePlanDto } from '../dtos/create-plan.dto';
import { CreatePlanPresenter } from '@/shared/infra/presenter/plan/create-plan.presenter';
import { ConvertPresenter } from '@/shared/infra/presenter/converter/converter.presenter';
import { AuthGuard } from '@/core/auth/infra/guard/auth.guard';
import { UpdatePlanDto } from '../dtos/update-plan.dto';
import { UpdatePlanPresenter } from '@/shared/infra/presenter/plan/update-plan.presenter';
import { UpdatePlanUseCase } from '../../application/usecase/update-plan.usecase';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@Controller('/v1/plan')
@ApiBearerAuth()
export class PlanController {
  constructor(
    private readonly createPlanUseCase: CreatePlanUseCase,
    private readonly updatePlanUseCase: UpdatePlanUseCase,
  ) {}

  @UseGuards(AuthGuard)
  @Post()
  @ApiOperation({ summary: 'Cria um novo plano' })
  @ApiCreatedResponse({
    description: 'Plano criado com sucesso',
    type: CreatePlanPresenter,
  })
  @ApiBody({ type: CreatePlanDto })
  @ApiConflictResponse({ description: 'Plano já cadastrado' })
  @ApiBadRequestResponse({ description: 'Dados inválidos' })
  @ApiUnauthorizedResponse({ description: 'Não autorizado' })
  @ApiInternalServerErrorResponse({ description: 'Erro interno do servidor' })
  async create(@Body() body: CreatePlanDto): Promise<CreatePlanPresenter> {
    const output = await this.createPlanUseCase.execute(body);

    const presenter = ConvertPresenter.toPresenter(output, CreatePlanPresenter);

    return presenter;
  }

  @UseGuards(AuthGuard)
  @Put()
  @ApiOperation({ summary: 'Atualiza um plano existente' })
  @ApiBody({ type: UpdatePlanDto })
  @ApiOkResponse({
    description: 'Plano atualizado com sucesso',
    type: UpdatePlanPresenter,
  })
  @ApiBadRequestResponse({ description: 'Dados inválidos' })
  @ApiUnauthorizedResponse({ description: 'Não autorizado' })
  @ApiInternalServerErrorResponse({ description: 'Erro interno do servidor' })
  async update(@Body() body: UpdatePlanDto): Promise<UpdatePlanPresenter> {
    const output = await this.updatePlanUseCase.execute(body);

    const presenter = ConvertPresenter.toPresenter(output, CreatePlanPresenter);

    return presenter;
  }
}
