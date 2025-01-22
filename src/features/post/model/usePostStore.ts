import { create } from 'zustand';
import {
  setPostListAction,
  setSelectedPostAction,
  setPaginationAction,
  setSortingAction,
  setSearchQueryAction,
} from './postActions';
import { PostStoreStateType } from 'src/entities/post/model/types';

export const usePostStore = create<PostStoreStateType>((set) => ({
  // 게시물 목록
  postList: [],
  total: 0,

  // 선택된 게시물
  selectedPost: null,

  // 페이지네이션
  pagination: {
    skip: 0,
    limit: 10,
  },

  // 정렬
  sorting: {
    sortBy: 'date',
    sortOrder: 'asc',
  },

  // 필터
  searchQuery: '',

  // 상태 변경 함수들 (액션들)
  ...setPostListAction(set),
  ...setSelectedPostAction(set),
  ...setPaginationAction(set),
  ...setSortingAction(set),
  ...setSearchQueryAction(set),
}));
