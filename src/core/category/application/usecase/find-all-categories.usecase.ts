import { PROVIDERS } from '@/shared/application/constants/providers';
import { UseCase } from '@/shared/application/usecase/usecase';
import { Inject } from '@nestjs/common';
import { CategoryRepository } from '../../domain/repositories/category.repository';
import { LoggedUserService } from '@/shared/application/logged-user/logged-user.service';
import { CategoryOutput } from '@/shared/application/output/category/category.output';
import { NotFoundError } from '@/shared/application/errors/not-found-error';
import { UserEntity } from '@/core/user/domain/entities/user.entity';
import { Category } from '../../domain/entities/category.entity';

type Input = void;

type Output = CategoryOutput[];

export class FindAllCategoriesByCompanyUseCase implements UseCase<Input, Output> {
  constructor(
    @Inject(PROVIDERS.CATEGORY_REPOSITORY)
    private readonly categoryRepository: CategoryRepository,
    @Inject(PROVIDERS.LOGGED_USER_SERVICE)
    private readonly loggedUserService: LoggedUserService,
  ) {}

  private loggedUser: UserEntity;

  async execute(input: Input): Promise<Output> {
    this.loggedUser = this.loggedUserService.getLoggedUser();

    const categories = await this.categoryRepository.findAllByCompanyId(
      this.loggedUser.company.id,
    );

    // if (!categories.length) {
    //   throw new NotFoundError(`Nenhuma categoria encontrada`);
    // }

    const output = this.mapToOutput(categories);

    return output;
  }

  private mapToOutput(categories: Category[]): Output {
    const map = new Map<string, CategoryOutput>();

    categories.forEach((category) => {
      map.set(category.id, {
        id: category.id,
        name: category.name,
        parentId: category.parent?.id ?? null,
        children: [],
      });
    });

    const roots: Output = [];

    categories.forEach((category) => {
      const node = map.get(category.id)!;

      if (category.parent) {
        const parentNode = map.get(category.parent.id);
        parentNode?.children.push(node);
      } else {
        roots.push(node);
      }
    });

    return roots;
  }
}
