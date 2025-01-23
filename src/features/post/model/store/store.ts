import { create } from 'zustand';
import {
  setPostListAction,
  setSelectedPostAction,
  setPaginationAction,
  setSearchQueryAction,
  setPostDialogAction,
} from './actions';
import { PostStoreStateType } from '../../../../entities/post/model/types';

export const usePostStore = create<PostStoreStateType>((set) => ({
  // 게시물 목록
  postList: [],
  total: 0,

  // 선택된 게시물
  selectedPost: null,
  isPostDetailOpen: false,
  isPostFormOpen: false,

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

  // 다이얼로그 상태
  dialogs: {
    detail: false,
    form: false,
  },

  // 상태 변경 함수들 (액션들)
  ...setPostListAction(set),
  ...setSelectedPostAction(set),
  ...setPaginationAction(set),
  ...setSearchQueryAction(set),
  ...setPostDialogAction(set),
}));
