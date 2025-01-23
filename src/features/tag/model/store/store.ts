import { create } from 'zustand';
import { TagStoreState } from '../../../../entities/tag/model/types';

export const useTagStore = create<TagStoreState>((set) => ({
  selectedTag: '',
  tags: [],

  setSelectedTag: (tag: TagStoreState['selectedTag']) => set({ selectedTag: tag }),
  setTags: (tags: TagStoreState['tags']) => set({ tags }),
}));
