import {
  PostItemType,
  PostStoreStateType,
  SetPaginationActionType,
  SetPostListActionType,
  SetSearchQueryActionType,
  SetSortingActionType,
  Set,
} from 'src/entities/post/model/types';

// 상태 업데이트를 위한 공통 함수
const setState = <K extends keyof PostStoreStateType>(
  set: Set<PostStoreStateType>,
  key: K,
  value: PostStoreStateType[K],
) => {
  set((state: PostStoreStateType) => ({ ...state, [key]: value }));
};

// 게시물과 총 게시물 수를 업데이트
export const setPostListAction = (set: Set<PostStoreStateType>): SetPostListActionType => ({
  // 게시물 업데이트
  setPostList: (postList: PostItemType[]) => setState(set, 'postList', postList),

  // 총 게시물 수 업데이트
  setTotal: (total: number) => setState(set, 'total', total),
});

// 선택된 게시물을 업데이트
export const setSelectedPostAction = (set: Set<PostStoreStateType>) => ({
  setSelectedPost: (post: PostItemType | null) => setState(set, 'selectedPost', post),
});

// 페이지네이션 정보를 업데이트
export const setPaginationAction = (set: Set<PostStoreStateType>): SetPaginationActionType => ({
  // 건너뛸 항목 수 업데이트
  setSkip: (skip: number) =>
    set((state) => ({
      ...state,
      pagination: {
        ...state.pagination,
        skip,
      },
    })),

  // 한 페이지에 표시할 항목 수 업데이트
  setLimit: (limit: number) =>
    set((state) => ({ ...state, pagination: { ...state.pagination, limit } })),
});

// 정렬 정보를 업데이트
export const setSortingAction = (set: Set<PostStoreStateType>): SetSortingActionType => ({
  // 정렬 기준 업데이트
  setSortBy: (sortBy: 'date' | 'title' | 'author') =>
    set((state) => ({ ...state, sorting: { ...state.sorting, sortBy } })),

  // 정렬 순서 업데이트
  setSortOrder: (sortOrder: 'asc' | 'desc') =>
    set((state) => ({ ...state, sorting: { ...state.sorting, sortOrder } })),
});

// 검색 쿼리를 업데이트
export const setSearchQueryAction = (set: Set<PostStoreStateType>): SetSearchQueryActionType => ({
  setSearchQuery: (searchQuery: string) => setState(set, 'searchQuery', searchQuery),
});
