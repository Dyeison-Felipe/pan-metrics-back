import { Body, Controller, Post } from '@nestjs/common';
import { CreateCompanyDto } from '../dtos/create-company.dto';
import { CreateCompanyUseCase } from '../../application/usecase/create-company.usecase';
import { CreateCompanyPresenter } from '@/shared/infra/presenter/company/create-company.presenter';
import { Public } from '@/shared/infra/decorators/permission.decorator';

@Controller('v1/company')
export class CompanyController {
  constructor(private readonly createCompanyUseCase: CreateCompanyUseCase) {}

  @Post()
  @Public()
  async create(@Body() dto: CreateCompanyDto): Promise<CreateCompanyPresenter> {
    return await this.createCompanyUseCase.execute(dto);
  }
}
