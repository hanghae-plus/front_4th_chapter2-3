import { create } from 'zustand';
import { TagType } from '../../../entities/tag/model/types';

interface TagStoreStateType {
  tags: TagType[];
  selectedTag: string | null;
  setTags: (tags: TagType[]) => void;
  setSelectedTag: (tag: string | null) => void;
}

export const useTagStore = create<TagStoreStateType>((set) => ({
  tags: [],
  selectedTag: null,
  setTags: (tags) => set({ tags }),
  setSelectedTag: (tag) => set({ selectedTag: tag }),
}));
