import { UserType } from 'src/entities/user/model/types';

export interface PostItemType {
  author: UserType | undefined;
  id: number;
  title: string;
  body: string;
  tags: string[];
  reactions?: {
    likes: number;
    dislikes: number;
  };
  views: number;
  userId: number;
}

export interface PostListDataType {
  postList: PostItemType[];
  total: number;
}

export interface PostStoreStateType {
  postList: PostItemType[];
  total: number;

  selectedPost: PostItemType | null;

  pagination: {
    skip: number;
    limit: number;
  };
  sorting: {
    sortBy: 'date' | 'title' | 'author';
    sortOrder: 'asc' | 'desc';
  };
  searchQuery: string;

  setPostList: (postList: PostItemType[]) => void;
  setTotal: (total: number) => void;
  setSkip: (skip: number) => void;
  setLimit: (limit: number) => void;
  setSortBy: (sortBy: 'date' | 'title' | 'author') => void;
  setSortOrder: (sortOrder: 'asc' | 'desc') => void;
  setSearchQuery: (searchQuery: string) => void;
}

export type Set<T> = (fn: (state: T) => T) => void;

export interface SetPostListActionType {
  setPostList: (postList: PostItemType[]) => void;
  setTotal: (total: number) => void;
}

export interface SetPaginationActionType {
  setSkip: (skip: number) => void;
  setLimit: (limit: number) => void;
}

export interface SetSortingActionType {
  setSortBy: (sortBy: 'date' | 'title' | 'author') => void;
  setSortOrder: (sortOrder: 'asc' | 'desc') => void;
}

export interface SetSearchQueryActionType {
  setSearchQuery: (searchQuery: string) => void;
}
