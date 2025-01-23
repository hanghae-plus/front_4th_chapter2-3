export interface PostsUrlParams {
  skip: number;
  limit: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  tag?: string;
}
