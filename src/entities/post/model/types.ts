import { UserType } from '../../../entities/user/model/types';

// 게시물 아이템 타입
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

// 게시물 목록 데이터 타입
export interface PostListDataType {
  postList: PostItemType[];
  total: number;
}

// 게시물 스토어 상태 타입
export interface PostStoreStateType {
  postList: PostItemType[];
  total: number;

  dialogs: {
    detail: boolean;
    form: boolean;
  };

  selectedPost: PostItemType | null;

  pagination: {
    skip: number;
    limit: number;
  };
  searchQuery: string;

  setPostList: (postList: PostItemType[]) => void;
  setTotal: (total: number) => void;
  setSkip: (skip: number) => void;
  setLimit: (limit: number) => void;
  setSearchQuery: (searchQuery: string) => void;
  setSelectedPost: (post: PostItemType | null) => void;
  setDialog: (type: string, isOpen: boolean) => void;
}

// 상태 설정 함수 타입
export type Set<T> = (fn: (state: T) => T) => void;

export interface SetPostListActionType {
  setPostList: (postList: PostItemType[]) => void;
  setTotal: (total: number) => void;
}

// 페이지네이션 상태 설정 함수 타입
export interface SetPaginationActionType {
  setSkip: (skip: number) => void;
  setLimit: (limit: number) => void;
}

// 검색 쿼리 상태 설정 함수 타입
export interface SetSearchQueryActionType {
  setSearchQuery: (searchQuery: string) => void;
}
