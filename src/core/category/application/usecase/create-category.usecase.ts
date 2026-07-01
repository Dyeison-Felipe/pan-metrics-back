import { PROVIDERS } from '@/shared/application/constants/providers';
import { UseCase } from '@/shared/application/usecase/usecase';
import { Inject } from '@nestjs/common';
import { CategoryRepository } from '../../domain/repositories/category.repository';
import { LoggedUserService } from '@/shared/application/logged-user/logged-user.service';
import { ConflictError } from '@/shared/application/errors/conflict-error';
import { Category } from '../../domain/entities/category.entity';
import { CreateCategoryOutput } from '@/shared/application/output/category/create-category.output';
import { NotFoundError } from '@/shared/application/errors/not-found-error';

type Input = {
  name: string;
  parentId?: string;
};

type Output = CreateCategoryOutput;

export class CreateCategoryUseCase implements UseCase<Input, Output> {
  constructor(
    @Inject(PROVIDERS.CATEGORY_REPOSITORY)
    private readonly categoryRepository: CategoryRepository,
    @Inject(PROVIDERS.LOGGED_USER_SERVICE)
    private readonly loggedUserService: LoggedUserService,
  ) {}

  async execute({ name, parentId }: Input): Promise<Output> {
    const loggedUser = this.loggedUserService.getLoggedUser();

    const existCategory =
      await this.categoryRepository.findCategoryByNameAndCompanyId(
        name,
        loggedUser.company.id,
      );

    if (existCategory) {
      throw new ConflictError(`Já existe uma categoria com esse nome`);
    }

    let categoryParentId: Category | null;

    if (parentId) {
      categoryParentId = await this.categoryRepository.findById(parentId);
      if (!categoryParentId) {
        throw new NotFoundError(`Categoria não encontrada`);
      }
    } else {
      categoryParentId = null;
    }

    const category = Category.create({
      name: name,
      company: loggedUser.company,
      parent: categoryParentId,
      createdBy: loggedUser.id,
      updatedBy: loggedUser.id,
    });

    const saveCategory = await this.categoryRepository.save(category);

    const output: Output = {
      id: saveCategory.id,
      name: saveCategory.name,
      parentId: saveCategory.parent ? saveCategory.parent.id : null,
    };

    return output;
  }
}
