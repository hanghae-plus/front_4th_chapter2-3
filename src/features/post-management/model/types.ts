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

export interface PaginationState {
  skip: number;
  limit: number;
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

type SortBy = 'none' | 'id' | 'title' | 'reactions';
type SortOrder = 'asc' | 'desc';

export interface PostManagementState {
  // 필터 관련
  filters: {
    search: string;
    tag: string;
    sortBy: SortBy;
    sortOrder: SortOrder;
  };

  // 페이지네이션 관련
  pagination: {
    skip: number;
    limit: number;
  };

  // UI 상태
  loading: boolean;
}
