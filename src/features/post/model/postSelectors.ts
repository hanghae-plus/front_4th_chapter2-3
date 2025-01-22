import { PostStoreStateType } from 'src/entities/post/model/types';
type Selector<T> = (state: PostStoreStateType) => T;

export const selectPostList: Selector<PostStoreStateType['postList']> = (state) => state.postList;
export const selectSelectedPost: Selector<PostStoreStateType['selectedPost']> = (state) =>
  state.selectedPost;
export const selectTotal: Selector<PostStoreStateType['total']> = (state) => state.total;
export const selectPagination: Selector<PostStoreStateType['pagination']> = (state) =>
  state.pagination;
export const selectSorting: Selector<PostStoreStateType['sorting']> = (state) => state.sorting;
export const selectSearchQuery: Selector<PostStoreStateType['searchQuery']> = (state) =>
  state.searchQuery;
