import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { PostStore } from './types';

const usePostStore = create<PostStore>()(
  devtools(
    (set) => ({
      selectedPost: null,
      isEditing: false,

      selectPost: (post) => set({ selectedPost: post, isEditing: false }),
      setIsEditing: (isEditing) => set({ isEditing }),
      reset: () => set({ selectedPost: null, isEditing: false }),
    }),
    {
      name: 'PostStore',
    },
  ),
);

export { usePostStore };
