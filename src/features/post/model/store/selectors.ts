import { PostStoreStateType } from '../../../../entities/post/model/types';
type Selector<T> = (state: PostStoreStateType) => T;

// 게시물 목록 선택자
export const selectPostList: Selector<PostStoreStateType['postList']> = (state) => state.postList;

// 선택된 게시물 선택자
export const selectSelectedPost: Selector<PostStoreStateType['selectedPost']> = (state) =>
  state.selectedPost;

// 총 게시물 수 선택자
export const selectTotal: Selector<PostStoreStateType['total']> = (state) => state.total;

// 페이지네이션 선택자
export const selectPagination: Selector<PostStoreStateType['pagination']> = (state) =>
  state.pagination;

// 검색 쿼리 선택자
export const selectSearchQuery: Selector<PostStoreStateType['searchQuery']> = (state) =>
  state.searchQuery;

// 다이얼로그 선택자
export const selectPostDialog: Selector<PostStoreStateType['dialogs']> = (state) => state.dialogs;
