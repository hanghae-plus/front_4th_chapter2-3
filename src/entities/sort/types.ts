import { SORT_OPTIONS, SORT_ORDER } from './constants';

// 정렬 옵션 타입
export type SortOption = keyof typeof SORT_OPTIONS;

// 정렬 순서 타입
export type SortOrderType = keyof typeof SORT_ORDER;

// 정렬 상태 타입
export interface SortStateType {
  sortBy: SortOption;
  sortOrder: SortOrderType;
}

// 정렬 스토어 상태 타입
export interface SortStoreStateType {
  sortBy: SortOption;
  sortOrder: SortOrderType;
  setSortBy: (sortBy: SortOption) => void;
  setSortOrder: (sortOrder: SortOrderType) => void;
}
