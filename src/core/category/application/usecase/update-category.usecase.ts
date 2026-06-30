import { PROVIDERS } from '@/shared/application/constants/providers';
import { UseCase } from '@/shared/application/usecase/usecase';
import { Inject } from '@nestjs/common';
import { CategoryRepository } from '../../domain/repositories/category.repository';
import { LoggedUserService } from '@/shared/application/logged-user/logged-user.service';
import { NotFoundError } from '@/shared/application/errors/not-found-error';
import { CategoryOutput } from '@/shared/application/output/category/category.output';
import { BadRequestError } from '@/shared/application/errors/bad-request-error';
import { Category } from '../../domain/entities/category.entity';

type Input = {
  id: string;
  name: string;
  parentId?: string | null;
};

type Output = CategoryOutput;

export class CreateCategoryUseCase implements UseCase<Input, Output> {
  constructor(
    @Inject(PROVIDERS.CATEGORY_REPOSITORY)
    private readonly categoryRepository: CategoryRepository,
    @Inject(PROVIDERS.LOGGED_USER_SERVICE)
    private readonly loggedUserService: LoggedUserService,
  ) {}

  async execute({ name, id, parentId }: Input): Promise<Output> {
    const loggedUser = this.loggedUserService.getLoggedUser();

    const existCategory =
      await this.categoryRepository.findCategoryByIdAndCompanyId(
        id,
        loggedUser.company.id,
      );

    if (!existCategory) {
      throw new NotFoundError(
        `${parentId ? 'Sub-categoria' : 'Categoria'}  não encontrada`,
      );
    }

    let parent: Category | null = existCategory?.parent ? existCategory.parent : null;

    if (parent) {
      if (parentId === id) {
        throw new BadRequestError(
          `Uma categoria não pode ser atribuida a ela mesma`,
        );
      }

      const parentCategory =
        await this.categoryRepository.findCategoryByIdAndCompanyId(
          parentId,
          loggedUser.company.id,
        );

      if (!parentCategory) {
        throw new NotFoundError(`Categoria não encontrada`);
      }

      parent = parentCategory;
    }

    existCategory.update({
      name: name,
      updatedBy: loggedUser.id,
      parent: parent,
    });

    const saveCategory = await this.categoryRepository.update(existCategory);

    const output: Output = {
      id: saveCategory.id,
      name: saveCategory.name,
      parentId: saveCategory.parent ? saveCategory.parent.id : null,
      children: [],
    };

    return output;
  }
}
