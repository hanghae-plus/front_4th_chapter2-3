import { Post } from "../../post/model/types"
import { User } from "../../user/api/userApi"
import { Comment } from "../model/types"

export interface CommentsTypes {
  comments: Comment[]
  total: number
  skip: number
  limit: number
}

export interface CreateCommentParams {
  body: {
    body: string
    postId: Post["id"]
    userId: User["id"]
  }
}

export const commentsApi = {
  getComments: async (postId: Post["id"]) => {
    try {
      const response = await fetch(`/api/comments/post/${postId}`)
      return (await response.json()) as CommentsTypes
    } catch (error) {
      console.error("GET /api/comments/post/:id:", error)
    }
  },
  createComment: async (newComment: CreateCommentParams["body"]) => {
    try {
      const response = await fetch("/api/comments/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newComment),
      })
      return (await response.json()) as Comment
    } catch (error) {
      console.error("POST /api/comments/add:", error)
    }
  },
  updateComment: async (comment: Comment) => {
    try {
      const response = await fetch(`/api/comments/${comment.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(comment),
      })
      return (await response.json()) as Comment
    } catch (error) {
      console.error("PUT /api/comments/:id:", error)
    }
  },
  deleteComment: async (commentId: Comment["id"]) => {
    try {
      await fetch(`/api/comments/${commentId}`, { method: "DELETE" })
    } catch (error) {
      console.error("DELETE /api/comments/:id:", error)
    }
  },
  likeComment: async (comment: Comment) => {
    try {
      const response = await fetch(`/api/comments/${comment.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ likes: comment.likes + 1 }),
      })
      return (await response.json()) as Comment
    } catch (error) {
      console.error("PATCH /api/comments/:id:", error)
    }
  },
}
