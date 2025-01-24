export type ListResponse<T> = T & {
  total: number;
  skip: number;
  limit: number;
};
