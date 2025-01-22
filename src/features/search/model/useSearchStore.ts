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
  initParams: (query: string) => void;
  updateParams: () => string;
}

type SearchStoreProps = State & Action;

const useSearchStoreCreator: StateCreator<SearchStoreProps> = (set, get) => ({
  total: 0,
  skip: 0,
  limit: 10,
  searchQuery: '',
  sortBy: '',
  sortOrder: 'asc',
  selectedTag: '',
  setTotal: (total) => set({ total }),
  setSkip: (skip) => set({ skip }),
  setLimit: (limit) => set({ limit }),
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  setSortBy: (sortBy) => set({ sortBy }),
  setSortOrder: (sortOrder) => set({ sortOrder }),
  setSelectedTag: (selectedTag) => set({ selectedTag }),
  initParams: (query) => {
    const params = new URLSearchParams(query);
    const skip = Number(params.get('skip') || '0');
    const limit = Number(params.get('limit') || '10');
    const searchQuery = params.get('searchQuery') || '';
    const sortBy = params.get('sortBy') || '';
    const sortOrder = params.get('sortOrder') || 'asc';
    const selectedTag = params.get('selectedTag') || '';
    set({ skip, limit, searchQuery, sortBy, sortOrder, selectedTag });
  },
  updateParams: () => {
    const { skip, limit, searchQuery, sortBy, sortOrder, selectedTag } = get();
    const params = new URLSearchParams();
    if (skip) params.set('skip', skip.toString());
    if (limit) params.set('limit', limit.toString());
    if (searchQuery) params.set('searchQuery', searchQuery);
    if (sortBy) params.set('sortBy', sortBy);
    if (sortOrder) params.set('sortOrder', sortOrder);
    if (selectedTag) params.set('selectedTag', selectedTag);
    return params.toString() ? `?${params.toString()}` : '';
  },
});

const searchStore = create(useSearchStoreCreator);

const useSearchStore = createStoreSelector(searchStore);

export default useSearchStore;
