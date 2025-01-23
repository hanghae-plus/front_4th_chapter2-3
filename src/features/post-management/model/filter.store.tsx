// features/post-management/model/filter.store.ts
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { FilterStore, FilterState } from './types';

const initialState: FilterState = {
  search: '',
  tag: '',
  sortBy: 'none',
  sortOrder: 'asc',
};

export const useFilterStore = create<FilterStore>()(
  devtools(
    (set) => ({
      ...initialState,

      setFilter: (key, value) =>
        set(
          (state) => ({
            ...state,
            [key]: value,
          }),
          false,
          'filter/setFilter',
        ),

      resetFilters: () => set(initialState, false, 'filter/resetFilters'),
    }),
    {
      name: 'FilterStore',
    },
  ),
);
