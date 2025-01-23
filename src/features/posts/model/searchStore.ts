import { create } from 'zustand';

interface SearchStore {
  // 상태
  searchQuery: string;
  selectedTag: string;
  sortBy: string;
  sortOrder: 'asc' | 'desc';

  // 액션
  setSearchQuery: (query: string) => void;
  setSelectedTag: (tag: string, updateUrl?: boolean) => void;
  setSortBy: (sortBy: string) => void;
  setSortOrder: (order: 'asc' | 'desc') => void;
  resetFilters: () => void;
}

export const useSearchStore = create<SearchStore>((set) => ({
  // 초기 상태
  searchQuery: '',
  selectedTag: '',
  sortBy: '',
  sortOrder: 'asc',

  // 액션 구현
  setSearchQuery: (query) => set({ searchQuery: query }),
  setSelectedTag: (tag) => set({ selectedTag: tag }),
  setSortBy: (sortBy) => set({ sortBy }),
  setSortOrder: (order) => set({ sortOrder: order }),
  resetFilters: () =>
    set({
      searchQuery: '',
      selectedTag: '',
      sortBy: '',
      sortOrder: 'asc',
    }),
}));
