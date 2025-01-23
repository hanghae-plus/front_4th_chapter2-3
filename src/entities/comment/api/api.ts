import { httpClient } from "../../../shared/api"
import { AddCommentRequest, AddCommentResponse, Comment, CommentsResponse } from "../model"

export const commentsApi = {
  fetchComments: async (postId: number) => {
    const response = await httpClient.get<CommentsResponse>(`/comments/post/${postId}`)
    return response.data
  },

  addComment: async (comment: AddCommentRequest) => {
    const response = await httpClient.post<AddCommentResponse>("/comments/add", comment)
    return response.data
  },

  updateComment: async (id: number, body: string) => {
    const response = await httpClient.put<Comment>(`/comments/${id}`, { body })
    return response.data
  },

  deleteComment: async (id: number) => {
    const response = await httpClient.delete<void>(`/comments/${id}`)
    return response.data
  },

  likeComment: async (id: number, likes: number) => {
    const response = await httpClient.patch<Comment>(`/comments/${id}`, { likes })
    return response.data
  },
}
