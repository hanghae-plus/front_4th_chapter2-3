import type { Post } from '@/entities/post/model/types';
import type { Comment } from '@/entities/comment/model/types';

// 공통 타입
type SortBy = 'none' | 'id' | 'title' | 'reactions';
type SortOrder = 'asc' | 'desc';

// 게시물 API 관련 타입
export interface PostsRequestParams extends Partial<FilterState> {
  skip: number;
  limit: number;
}

export interface PostsResponse {
  posts: Post[];
  total: number;
}

// 댓글 상태 타입
export interface CommentsState {
  [postId: number]: Comment[];
}

// 게시물 필터링 상태
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

// 페이지네이션 상태
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

// UI 상태
export interface UIState {
  loading: boolean;
}

export interface UIActions {
  setLoading: (loading: boolean) => void;
}

export interface UIStore extends UIState, UIActions {}

// 새로운 게시물 생성 타입
export interface NewPost {
  title: string;
  body: string;
  userId: number;
}

// 새로운 댓글 생성 타입
export interface NewComment {
  body: string;
  postId: number | null;
  userId: number;
}
