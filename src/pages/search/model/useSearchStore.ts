import { StateCreator } from 'zustand/vanilla';
import { create } from 'zustand/react';
import { createStoreSelector } from '../../../shared/model';

interface State {
  total: number;
  skip: number;
  limit: number;
  searchQuery: string;
  sortBy: string;
  sortOrder: string;
  selectedTag: string;
}

interface Action {
  setTotal: (total: number) => void;
  setSkip: (skip: number) => void;
  setLimit: (limit: number) => void;
  setSearchQuery: (searchQuery: string) => void;
  setSortBy: (sortBy: string) => void;
  setSortOrder: (sortOrder: string) => void;
  setSelectedTag: (selectedTag: string) => void;
}

type SearchStoreProps = State & Action;

const useSearchStoreCreator: StateCreator<SearchStoreProps> = (set) => ({
  total: 0,
  skip: 0,
  limit: 10,
  searchQuery: '',
  sortBy: 'createdAt',
  sortOrder: 'asc',
  selectedTag: '',
  setTotal: (total) => set({ total }),
  setSkip: (skip) => set({ skip }),
  setLimit: (limit) => set({ limit }),
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  setSortBy: (sortBy) => set({ sortBy }),
  setSortOrder: (sortOrder) => set({ sortOrder }),
  setSelectedTag: (selectedTag) => set({ selectedTag }),
});

const searchStore = create(useSearchStoreCreator);

const useSearchStore = createStoreSelector(searchStore);

export default useSearchStore;
