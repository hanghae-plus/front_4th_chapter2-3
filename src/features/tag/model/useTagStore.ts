import { Tag } from '../../../types.ts';
import { StateCreator } from 'zustand/vanilla';
import { create } from 'zustand/react';
import { createStoreSelector } from '../../../shared/model';

interface State {
  tags: Tag[];
}

interface Action {
  setTags: (tags: ((prev: Tag[]) => Tag[]) | Tag[]) => void;
}

type TagStoreProps = State & Action;

const useTagStoreCreator: StateCreator<TagStoreProps> = (set) => ({
  tags: [],
  setTags: (update) =>
    set((state) => ({ tags: typeof update === 'function' ? update(state.tags) : update })),
});

const tagStore = create(useTagStoreCreator);

export const useTagStore = createStoreSelector(tagStore);
