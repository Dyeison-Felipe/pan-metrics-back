export class MetaPresenter {
  totalItems: number;

  itemCount: number;

  itemsPerPage: number;

  totalPages: number;

  currentPage: number;

  constructor(
    totalItems: number,
    itemCount: number,
    itemsPerPage: number,
    totalPages: number,
    currentPage: number,
  ) {
    this.totalItems = totalItems;
    this.itemCount = itemCount;
    this.itemsPerPage = itemsPerPage;
    this.totalPages = totalPages;
    this.currentPage = currentPage;
  }
}

export class PaginationPresenter<Item> {
  items: Item[];

  meta: MetaPresenter;

  constructor(items: Item[], meta: MetaPresenter) {
    this.items = items;
    this.meta = meta;
  }
}
