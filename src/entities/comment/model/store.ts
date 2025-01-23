import { create } from "zustand"
import { Comment } from "./type"

interface CommentState {
  comments: Record<string, Comment[]>
  addComment: (comment: Comment) => void
  updateComment: (updatedComment: Comment) => void
  deleteComment: (postId: string, id: number) => void
  likeComment: (postId: string, id: number) => void
}

export const useCommentStore = create<CommentState>((set) => ({
  comments: {},
  addComment: (comment: Comment) =>
    set((state) => ({
      comments: {
        ...state.comments,
        [comment.postId]: [...(state.comments[comment.postId] || []), comment],
      },
    })),
  updateComment: (updatedComment: Comment) =>
    set((state) => ({
      comments: {
        ...state.comments,
        [updatedComment.postId]: state.comments[updatedComment.postId]?.map((comment) =>
          comment.id === updatedComment.id ? updatedComment : comment,
        ),
      },
    })),
  deleteComment: (postId: string, id: number) =>
    set((state) => ({
      comments: {
        ...state.comments,
        [postId]: state.comments[postId]?.filter((comment) => comment.id !== id) || [],
      },
    })),
  likeComment: (postId: string, id: number) =>
    set((state) => ({
      comments: {
        ...state.comments,
        [postId]:
          state.comments[postId].map((comment) =>
            comment.id === id ? { ...comment, likes: comment.likes + 1 } : comment,
          ) || [],
      },
    })),
}))
