import type { Post } from '@/entities/post/model/types';
import type { Comment } from '@/entities/comment/model/types';

export interface PostsRequestParams {
  skip: number;
  limit: number;
  search?: string;
  sortBy?: 'none' | 'id' | 'title' | 'reactions';
  sortOrder?: 'asc' | 'desc';
  tag?: string;
}

export interface PostsResponse {
  posts: Post[];
  total: number;
}

export interface CommentsState {
  [postId: number]: Comment[];
}

export interface PostFilters {
  search: string;
  tag: string;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
}

export interface NewPost {
  title: string;
  body: string;
  userId: number;
}

export interface NewComment {
  body: string;
  postId: number | null;
  userId: number;
}

// 필터 관련 타입
type SortBy = 'none' | 'id' | 'title' | 'reactions';
type SortOrder = 'asc' | 'desc';

export interface FilterState {
  search: string;
  tag: string;
  sortBy: SortBy;
  sortOrder: SortOrder;
}

export interface FilterActions {
  setFilter: <K extends keyof FilterState>(key: K, value: FilterState[K]) => void;
  resetFilters: () => void;
}

export interface FilterStore extends FilterState, FilterActions {}

// 페이지네이션 관련 타입
export interface PaginationState {
  skip: number;
  limit: number;
}

export interface PaginationActions {
  setPage: (skip: number) => void;
  setLimit: (limit: number) => void;
  resetPagination: () => void;
}

export interface PaginationStore extends PaginationState, PaginationActions {}

// UI 관련 타입
export interface UIState {
  loading: boolean;
}

export interface UIActions {
  setLoading: (loading: boolean) => void;
}

export interface UIStore extends UIState, UIActions {}
