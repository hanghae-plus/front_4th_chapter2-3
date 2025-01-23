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
