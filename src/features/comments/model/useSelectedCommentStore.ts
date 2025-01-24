import type { Comment } from '@/entities/comments/model';
import { createStoreSelector } from '@/shared/lib';
import { create } from 'zustand';

export const useSelectedCommentStore = create<{
  selectedComment: Comment | null;
  setSelectedComment: (comment: Comment) => void;
}>((set) => ({
  selectedComment: null,
  setSelectedComment: (comment) => set({ selectedComment: comment }),
}));

export const useSelectedCommentStoreSelector = createStoreSelector(useSelectedCommentStore);
