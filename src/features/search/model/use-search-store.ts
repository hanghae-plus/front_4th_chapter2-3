import { StateCreator } from 'zustand/vanilla';
import { create } from 'zustand/react';
import { createStoreSelector } from '../../../shared/lib';

interface State {
  searchQuery: string;
}

interface Action {
  setSearchQuery: (searchQuery: string) => void;
}

type SearchStoreProps = State & Action;

const useSearchStoreCreator: StateCreator<SearchStoreProps> = (set) => ({
  searchQuery: '',
  setSearchQuery: (searchQuery) => set({ searchQuery }),
});

const searchStore = create(useSearchStoreCreator);

const useSearchStore = createStoreSelector(searchStore);

export default useSearchStore;
