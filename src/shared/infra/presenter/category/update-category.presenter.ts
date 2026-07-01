export class UpdateCategoryPresenter {
  readonly id: string;
  readonly name: string;
  readonly parentId: string | null;
  readonly children: UpdateCategoryPresenter[];
}