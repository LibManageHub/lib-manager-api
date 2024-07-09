import { Pagination } from '../interfaces/pagination.interface';

export class PaginatedResponse<T> implements Pagination<T> {
  items: T[];
  totalItems: number;
  currentPage: number;
  totalPages: number;
  nextPage?: number;
  previousPage?: number;

  constructor(
    items: T[],
    totalItems: number,
    currentPage: number,
    totalPages: number,
    nextPage?: number,
    previousPage?: number,
  ) {
    this.items = items;
    this.totalItems = totalItems;
    this.currentPage = currentPage;
    this.totalPages = totalPages;
    this.nextPage = nextPage;
    this.previousPage = previousPage;
  }

  setNavigationPages() {
    if (this.currentPage < this.totalPages) {
      this.nextPage = this.currentPage + 1;
    }

    if (this.currentPage > 1) {
      this.previousPage = this.currentPage - 1;
    }
  }
}
