import { create } from 'zustand';

import type { Post } from '@/entities/posts/model';
import { createStoreSelector } from '@/shared/lib';

export interface SelectedPostStore {
  selectedPost: Post;
  setSelectedPost: (post: Post) => void;
}

export const useSelectedPostStore = create<SelectedPostStore>()((set) => ({
  selectedPost: {} as Post,
  setSelectedPost: (post) => set({ selectedPost: post }),
}));

export const useSelectedPostStoreSelector = createStoreSelector(useSelectedPostStore);
