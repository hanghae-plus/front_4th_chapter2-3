// 순수한 API 로직을 담는다

import axios from "axios"
import { CreateCommentDto } from "../model/types"

export const CommentApi = {
  getComments: async (postId: number): Promise<Comment[]> => {
    const { data } = await axios.get(`/api/comments/post=${postId}`)
    return data
  },
  createComment: async (comment: CreateCommentDto): Promise<Comment> => {
    const { data } = await axios.post("/api/comments/add", comment)
    return data
  },
  deleteComment: async (id: number): Promise<void> => {
    await axios.delete(`/api/comments/${id}`)
  },
}
