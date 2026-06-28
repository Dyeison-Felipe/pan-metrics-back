import { Body, Controller, Post } from '@nestjs/common';
import { CreateCompanyDto } from '../dtos/create-company.dto';
import { CreateCompanyUseCase } from '../../application/usecase/create-company.usecase';
import { CreateCompanyPresenter } from '@/shared/infra/presenter/company/create-company.presenter';
import { Public } from '@/shared/infra/decorators/permission.decorator';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('v1/company')
export class CompanyController {
  constructor(private readonly createCompanyUseCase: CreateCompanyUseCase) {}

  @Post()
  @Public()
  @ApiOperation({
    summary: 'Criar empresa',
    description: 'Realiza o cadastro de uma nova empresa no sistema.',
  })
  @ApiBody({
    type: CreateCompanyDto,
  })
  @ApiResponse({
    status: 201,
    description: 'Empresa criada com sucesso',
    type: CreateCompanyPresenter,
  })
  @ApiResponse({
    status: 400,
    description: 'Dados inválidos',
  })
  @ApiResponse({
    status: 409,
    description: 'Empresa já cadastrada',
  })
  async create(@Body() dto: CreateCompanyDto): Promise<CreateCompanyPresenter> {
    return await this.createCompanyUseCase.execute(dto);
  }
}
