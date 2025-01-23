import { create } from 'zustand';
import { CommentType } from '../../../entities/comment/model/types';

interface CommentStoreStateType {
  comments: Map<number, CommentType[]>;
  selectedComment: CommentType | null;
  isCommentFormOpen: boolean;
  setComments: (postId: number, comments: CommentType[]) => void;
  setSelectedComment: (comment: CommentType | null) => void;
  setIsCommentFormOpen: (isOpen: boolean) => void;
  addComment: (postId: number, comment: CommentType) => void;
  updateComment: (postId: number, comment: CommentType) => void;
  deleteComment: (postId: number, commentId: number) => void;
  likeComment: (postId: number, commentId: number) => void;
  getCommentsByPostId: (postId: number) => CommentType[];
}

/**
 * 댓글 스토어
 * 댓글 목록, 선택된 댓글, 댓글 폼 열기 상태를 관리
 */
export const useCommentStore = create<CommentStoreStateType>((set, get) => ({
  comments: new Map(),
  selectedComment: null,
  isCommentFormOpen: false,

  setComments: (postId, comments) =>
    set((state) => {
      const newComments = new Map(state.comments);
      newComments.set(postId, comments);
      return { comments: newComments };
    }),

  setSelectedComment: (comment) => set({ selectedComment: comment }),

  setIsCommentFormOpen: (isOpen) => set({ isCommentFormOpen: isOpen }),

  addComment: (postId, comment) =>
    set((state) => {
      const newComments = new Map(state.comments);
      const existingComments = newComments.get(postId) || [];
      newComments.set(postId, [...existingComments, comment]);
      return { comments: newComments };
    }),

  updateComment: (postId, updatedComment) =>
    set((state) => {
      const newComments = new Map(state.comments);
      const existingComments = newComments.get(postId) || [];
      newComments.set(
        postId,
        existingComments.map((comment) =>
          comment.id === updatedComment.id ? updatedComment : comment,
        ),
      );
      return { comments: newComments };
    }),

  deleteComment: (postId, commentId) =>
    set((state) => {
      const newComments = new Map(state.comments);
      const existingComments = newComments.get(postId) || [];
      newComments.set(
        postId,
        existingComments.filter((comment) => comment.id !== commentId),
      );
      return { comments: newComments };
    }),

  likeComment: (postId, commentId) =>
    set((state) => {
      const newComments = new Map(state.comments);
      const existingComments = newComments.get(postId) || [];
      newComments.set(
        postId,
        existingComments.map((comment) =>
          comment.id === commentId ? { ...comment, likes: comment.likes + 1 } : comment,
        ),
      );
      return { comments: newComments };
    }),

  getCommentsByPostId: (postId) => {
    const comments = get().comments;
    return comments.get(postId) || [];
  },
}));
