import { create } from 'zustand';
import { Comment } from '../../../shared/types';

interface CommentDialogStore {
  // 상태
  selectedComment: Comment | null;
  showAddDialog: boolean;
  showEditDialog: boolean;
  newComment: {
    body: string;
    postId: number;
    userId: number;
  };

  // 액션
  setSelectedComment: (comment: Comment | null) => void;
  setNewComment: (comment: { body: string; postId: number; userId: number }) => void;
  openAddDialog: (postId: number) => void;
  closeAddDialog: () => void;
  openEditDialog: (comment: Comment) => void;
  closeEditDialog: () => void;
}

export const useCommentDialogStore = create<CommentDialogStore>((set) => ({
  // 초기 상태
  selectedComment: null,
  showAddDialog: false,
  showEditDialog: false,
  newComment: {
    body: '',
    postId: 0,
    userId: 1,
  },

  // 액션 구현
  setSelectedComment: (comment) => set({ selectedComment: comment }),
  setNewComment: (comment) => set({ newComment: comment }),

  openAddDialog: (postId) =>
    set({
      showAddDialog: true,
      newComment: {
        body: '',
        postId,
        userId: 1,
      },
    }),

  closeAddDialog: () =>
    set({
      showAddDialog: false,
      newComment: {
        body: '',
        postId: 0,
        userId: 1,
      },
    }),

  openEditDialog: (comment) =>
    set({
      selectedComment: comment,
      showEditDialog: true,
    }),

  closeEditDialog: () =>
    set({
      showEditDialog: false,
      selectedComment: null,
    }),
}));
