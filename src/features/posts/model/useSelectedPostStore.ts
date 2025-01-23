import { create } from 'zustand';

import type { Post } from '@/entities/posts/model';

export interface SelectedPostStore {
  selectedPost: Post;
  setSelectedPost: (post: Post) => void;
}

export const useSelectedPostStore = create<SelectedPostStore>()((set) => ({
  selectedPost: {} as Post,
  setSelectedPost: (post) => set({ selectedPost: post }),
}));
