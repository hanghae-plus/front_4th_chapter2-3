import { apiClient } from "@/shared/api"
import { Comment, CommentResponse, NewComment } from "../model/types"

export const commentApi = {
  /* --------------------------------
   * GET Requests
   * -------------------------------- */

  // 댓글 가져오기
  getComments: async (postId: number) => {
    const response = await apiClient.get<CommentResponse>(`/comments/post/${postId}`)
    return response.data
  },

  /* --------------------------------
   * POST Requests
   * -------------------------------- */

  // 댓글 추가하기
  addComment: async (data: NewComment) => {
    const response = await apiClient.post<Comment>("/comments/add", data)
    return response.data
  },

  /* --------------------------------
   * PUT Requests
   * -------------------------------- */

  // 댓글 업데이트
  updateComment: async (commentId: number, data: object) => {
    const response = await apiClient.put<Comment>(`/comments/${commentId}`, data)
    return response.data
  },

  /* --------------------------------
   * PATCH Requests
   * -------------------------------- */

  // 댓글 좋아요
  likeComment: async (commentId: number, data: object) => {
    const response = await apiClient.patch<Comment>(`/comments/${commentId}`, data)
    return response.data
  },

  /* --------------------------------
   * DELETE Requests
   * -------------------------------- */

  // 댓글 삭제

  removeComment: async (commentId: number) => {
    const response = await apiClient.delete(`/comments/${commentId}`)
    return response.data
  },
}
