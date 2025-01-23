import { StateCreator } from 'zustand/vanilla';
import { create } from 'zustand/react';
import { Tag } from '../../../entities/tag/model';

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

export const useTagStore = create(useTagStoreCreator);
