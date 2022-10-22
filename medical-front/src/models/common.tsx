export interface ListModel<T> {
  results: T[];
  count: number;
  next: string | boolean;
}

export const EMPTY_LIST = {
  results: [],
  count: 0,
  next: false,
}

export interface ListPageParams {
  page: number;
  page_size: number;
}
