import { StateCreator } from 'zustand/vanilla';
import { create } from 'zustand/react';
import { createStoreSelector } from '../../../shared/lib';
import { Tag } from '../../../entities/tag/model';

interface State {
  tags: Tag[];
  selectedTag: string;
}

interface Action {
  setTags: (tags: ((prev: Tag[]) => Tag[]) | Tag[]) => void;
  setSelectedTag: (selectedTag: string) => void;
}

type TagStoreProps = State & Action;

const useTagStoreCreator: StateCreator<TagStoreProps> = (set) => ({
  tags: [],
  selectedTag: '',
  setTags: (update) =>
    set((state) => ({ tags: typeof update === 'function' ? update(state.tags) : update })),
  setSelectedTag: (selectedTag) => set({ selectedTag }),
});

const tagStore = create(useTagStoreCreator);

export const useTagStore = createStoreSelector(tagStore);
