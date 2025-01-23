export type {
  PostsRequestParams,
  PostsResponse,
  CommentsState,
  NewPost,
  NewComment,
  FilterState,
  FilterActions,
  FilterStore,
  PaginationState,
  PaginationActions,
  PaginationStore,
  UIState,
  UIActions,
  UIStore,
} from './model';

export { usePaginationStore, useFilterStore, useUIStore } from './model';
export { usePostsQuery, fetchPosts } from './api';
