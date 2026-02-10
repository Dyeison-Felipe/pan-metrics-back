import { Pagination } from '@shared/domain/pagination/pagination';
import { PaginationPresenter } from '../pagination/pagination.presenter';

export class ConvertPresenter {
  static toPresenter<Output, Presenter>(
    output: Output,
    PresenterClass: new (output: Output) => Presenter,
  ): Presenter {
    return new PresenterClass(output);
  }

  static toPresenterList<Output, Presenter>(
    outputs: Output[],
    PresenterClass: new (output: Output) => Presenter,
  ): Presenter[] {
    return outputs.map((output) => new PresenterClass(output));
  }

  static toPaginationPresenter<Output, Presenter>(
    paginationOutput: Pagination<Output>,
    PresenterClass: new (output: Output) => Presenter,
  ): PaginationPresenter<Presenter> {
    const presenters = paginationOutput.items.map(
      (output) => new PresenterClass(output),
    );

    return new PaginationPresenter(presenters, paginationOutput.meta);
  }
}
