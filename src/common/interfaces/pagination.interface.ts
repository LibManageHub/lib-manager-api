export interface Pagination<T> {
  items: T[];
  totalItems: number;
  currentPage: number;
  totalPages: number;
  nextPage?: number;
  previousPage?: number;
}


