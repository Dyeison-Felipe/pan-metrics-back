export class FindAllCategoryPresenter {
  readonly id: string;
  readonly name: string;
  readonly parentId: string | null;
  readonly children: FindAllCategoryPresenter[];

}