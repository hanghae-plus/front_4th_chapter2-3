import type { Comment } from '@/entities/comments/model';
import { createStoreSelector } from '@/shared/lib';
import { create } from 'zustand';
import { initialComment } from '../config';

export const useNewCommentStore = create<{
  newComment: Partial<Comment> | null;
  updateNewComment: (comment: Partial<Comment>) => void;
  resetNewComment: () => void;
}>((set) => ({
  newComment: initialComment,
  updateNewComment: (comment) => set({ newComment: comment }),
  resetNewComment: () => set({ newComment: initialComment }),
}));

export const useNewCommentStoreSelector = createStoreSelector(useNewCommentStore);
