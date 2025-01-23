import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { PaginationStore, PaginationState } from './types';

const initialState: PaginationState = {
  skip: 0,
  limit: 10,
};

export const usePaginationStore = create<PaginationStore>()(
  devtools(
    (set) => ({
      ...initialState,

      setPage: (skip) => set({ skip }, false, 'pagination/setPage'),

      setLimit: (limit) =>
        set(
          { limit, skip: 0 }, // limit 변경시 첫 페이지로
          false,
          'pagination/setLimit',
        ),

      resetPagination: () => set(initialState, false, 'pagination/reset'),
    }),
    {
      name: 'PaginationStore',
    },
  ),
);
