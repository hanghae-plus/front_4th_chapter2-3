import { create } from 'zustand';
import { SORT_OPTIONS, SORT_ORDER } from '../../../entities/sort/constants';
import { SortStoreStateType } from '../../../entities/sort/types';
export const useSortStore = create<SortStoreStateType>((set) => ({
  sortBy: SORT_OPTIONS.NONE,
  sortOrder: SORT_ORDER.ASC,

  setSortBy: (sortBy) => set({ sortBy }),
  setSortOrder: (sortOrder) => set({ sortOrder }),
}));
