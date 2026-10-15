import { Observable } from "rxjs";


export interface PaginationQuery {
  page: number;
  limit: number;
  sortBy?: string;
  order?: 'DESC' | 'ASC';
}

export interface TableSort {
  active: string;
  direction: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  items: T[];
  limit: number;
  page: number;
  total: number;
  totalPages: number;
}

export type PageQueryFn<T> = (
  page: number,
  limit: number,
  filter: { [key: string]: any },
  sort: TableSort | null,
) => Observable<PaginatedResponse<T>>;