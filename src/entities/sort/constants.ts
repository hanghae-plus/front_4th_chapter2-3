// 정렬 옵션
export const SORT_OPTIONS = {
  NONE: 'NONE',
  ID: 'ID',
  TITLE: 'TITLE',
  REACTIONS: 'REACTIONS',
} as const;

// 정렬 순서
export const SORT_ORDER = {
  ASC: 'ASC',
  DESC: 'DESC',
} as const;

// 정렬 옵션 목록
export const SORT_OPTIONS_LIST = Object.values(SORT_OPTIONS);

// 정렬 순서 목록
export const SORT_ORDER_LIST = Object.values(SORT_ORDER);
