import { Body, Controller, Get, Post, Put } from '@nestjs/common';
import { FindAllCategoriesByCompanyUseCase } from '../../application/usecase/find-all-categories.usecase';
import { CreateCategoryUseCase } from '../../application/usecase/create-category.usecase';
import { UpdateCategoryByCompanyUseCase } from '../../application/usecase/update-category.usecase';
import { FindAllCategoryPresenter } from '@/shared/infra/presenter/category/find-all-category.presenter';
import { CreateCategoryDto } from '../dtos/create-category.dto';
import { CreateCategoryPresenter } from '@/shared/infra/presenter/category/create-category.presenter';
import { UpdateCategoryDto } from '../dtos/update-category.dto';
import { UpdateCategoryPresenter } from '@/shared/infra/presenter/category/update-category.presenter';
import { Public } from '@/shared/infra/decorators/permission.decorator';

@Controller('v1/category')
export class CategoryController {
  constructor(
    private readonly findAllCategoriesByCompanyUseCase: FindAllCategoriesByCompanyUseCase,
    private readonly createCategoryByCompanyUseCase: CreateCategoryUseCase,
    private readonly updateCategoryByCompanyUseCase: UpdateCategoryByCompanyUseCase,
  ) {}

  @Get()
  async findAll(): Promise<FindAllCategoryPresenter[]> {
    return await this.findAllCategoriesByCompanyUseCase.execute();
  }

  @Post()
  async create(
    @Body() dto: CreateCategoryDto,
  ): Promise<CreateCategoryPresenter> {
    return await this.createCategoryByCompanyUseCase.execute(dto);
  }

  @Put()
  async update(
    @Body() dto: UpdateCategoryDto,
  ): Promise<UpdateCategoryPresenter> {
    return await this.updateCategoryByCompanyUseCase.execute(dto);
  }
}
