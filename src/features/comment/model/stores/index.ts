import { create } from "zustand"
import { Comment } from "@entities/comment/model"
import { commentsApi } from "@entities/comment/api"
import { PostComment } from "@entities/post/model"

interface CommentStore {
  comments: Record<number, Comment[]>
  selectedComment: Comment | null
  newComment: PostComment
  showAddCommentDialog: boolean
  showEditCommentDialog: boolean

  // actions
  setComments: (comments: Record<number, Comment[]>) => void
  setSelectedComment: (comment: Comment | null) => void
  setNewComment: (comment: PostComment) => void
  setShowAddCommentDialog: (show: boolean) => void
  setShowEditCommentDialog: (show: boolean) => void
  setNewCommentBody: (body: string) => void

  // async actions
  fetchComments: (postId: number) => Promise<void>
  addComment: () => Promise<void>
  updateComment: () => Promise<void>
  deleteComment: (id: number, postId: number) => Promise<void>
  likeComment: (id: number, postId: number) => Promise<void>
}

export const useCommentStore = create<CommentStore>((set, get) => ({
  comments: {},
  selectedComment: null,
  newComment: {
    body: "",
    postId: null,
    userId: 1,
  },
  showAddCommentDialog: false,
  showEditCommentDialog: false,

  setComments: (comments) => set({ comments }),
  setSelectedComment: (comment) => set({ selectedComment: comment }),
  setNewComment: (comment) => set({ newComment: comment }),
  setShowAddCommentDialog: (show) => set({ showAddCommentDialog: show }),
  setShowEditCommentDialog: (show) => set({ showEditCommentDialog: show }),
  setNewCommentBody: (body) =>
    set((state) => ({
      newComment: { ...state.newComment, body },
    })),

  fetchComments: async (postId: number) => {
    const { comments } = get()
    if (comments[postId]) return // 이미 불러온 댓글이 있으면 다시 불러오지 않음

    try {
      const commentsList = await commentsApi.fetchCommentsByPostId(postId)
      set((state) => ({
        comments: { ...state.comments, [postId]: commentsList },
      }))
    } catch (error) {
      console.error("댓글 가져오기 오류:", error)
    }
  },

  addComment: async () => {
    const { newComment } = get()
    if (!newComment.postId) return

    try {
      const data = await commentsApi.addComment({
        body: newComment.body,
        postId: newComment.postId,
        userId: newComment.userId,
      })

      set((state) => ({
        comments: {
          ...state.comments,
          [data.postId]: [...(state.comments[data.postId] || []), data],
        },
        showAddCommentDialog: false,
        newComment: { body: "", postId: null, userId: 1 },
      }))
    } catch (error) {
      console.error("댓글 추가 오류:", error)
    }
  },

  updateComment: async () => {
    const { selectedComment } = get()
    if (!selectedComment) return

    try {
      const data = await commentsApi.updateComment(selectedComment.id, selectedComment.body)
      set((state) => ({
        comments: {
          ...state.comments,
          [data.postId]: state.comments[data.postId]?.map((comment) => (comment.id === data.id ? data : comment)) || [],
        },
        showEditCommentDialog: false,
      }))
    } catch (error) {
      console.error("댓글 업데이트 오류:", error)
    }
  },

  deleteComment: async (id: number, postId: number) => {
    try {
      await commentsApi.deleteComment(id)
      set((state) => ({
        comments: {
          ...state.comments,
          [postId]: state.comments[postId].filter((comment) => comment.id !== id),
        },
      }))
    } catch (error) {
      console.error("댓글 삭제 오류:", error)
    }
  },

  likeComment: async (id: number, postId: number) => {
    const { comments } = get()
    const comment = comments[postId]?.find((c) => c.id === id)
    if (!comment) return

    try {
      const data = await commentsApi.likeComment(id, comment.likes ?? 0)
      set((state) => ({
        comments: {
          ...state.comments,
          [postId]:
            state.comments[postId]?.map((comment) =>
              comment.id === data.id ? { ...data, likes: (comment.likes ?? 0) + 1 } : comment,
            ) || [],
        },
      }))
    } catch (error) {
      console.error("댓글 좋아요 오류:", error)
    }
  },
}))
