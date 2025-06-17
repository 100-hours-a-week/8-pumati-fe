export type PaginationMeta = {
  nextCursorId: number;
  nextCursorTime: string;
  hasNext: boolean;
};

export type InfiniteScrollResponse<T, M = PaginationMeta> = {
  message: string;
  data: T[];
  meta: M;
};
