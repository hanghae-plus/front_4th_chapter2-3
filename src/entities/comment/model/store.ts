import { create } from "zustand"
import { Comment, newComment } from "./type"
import { addComment, deleteComment, getComments, likeComment, updateComment } from "../api"

interface CommentState {
  comments: Record<number, Comment[]>
  fetchComments: (postId: number) => Promise<void>
  addComment: (newComment: newComment) => Promise<void>
  updateComment: (updatedComment: Comment) => Promise<void>
  deleteComment: (postId: number, id: number) => Promise<void>
  likeComment: (postId: number, id: number) => Promise<void>
}

export const useCommentStore = create<CommentState>((set, get) => ({
  comments: {},
  fetchComments: async (postId: number) => {
    try {
      const response = await getComments(postId)
      console.log(response.data)
      set((state) => ({
        comments: {
          ...state.comments,
          [postId]: response.data.comments,
        },
      }))
    } catch (error) {
      console.error("댓글 가져오기 오류:", error)
    }
  },
  addComment: async (newComment: newComment) => {
    try {
      const response = await addComment(newComment)
      set((state) => ({
        comments: {
          ...state.comments,
          [response.data.postId]: [...(state.comments[response.data.postId] || []), response.data],
        },
      }))
    } catch (error) {
      console.error("댓글 추가 오류:", error)
    }
  },
  updateComment: async (updatedComment: Comment) => {
    try {
      const response = await updateComment(updatedComment)
      set((state) => ({
        comments: {
          ...state.comments,
          [response.data.postId]: state.comments[response.data.postId]?.map((comment) =>
            comment.id === response.data.id ? response.data : comment,
          ),
        },
      }))
    } catch (error) {
      console.error("댓글 업데이트 오류:", error)
    }
  },
  deleteComment: async (postId: number, id: number) => {
    try {
      await deleteComment(id)
      set((state) => ({
        comments: {
          ...state.comments,
          [postId]: state.comments[postId]?.filter((comment) => comment.id !== id) || [],
        },
      }))
    } catch (error) {
      console.error("댓글 삭제 오류:", error)
    }
  },
  likeComment: async (postId: number, id: number) => {
    try {
      const comment = get().comments[postId]?.find((comment) => comment.id === id)
      const response = await likeComment(id, { likes: (comment?.likes ?? 0) + 1 })
      set((state) => ({
        comments: {
          ...state.comments,
          [postId]:
            state.comments[postId].map((comment) =>
              comment.id === response.data.id ? { ...response.data, likes: comment.likes + 1 } : comment,
            ) || [],
        },
      }))
    } catch (error) {
      console.error("댓글 좋아요 오류:", error)
    }
  },
}))
