import { DeletedPost } from "@entities/post/types"
import { CommentsResponse } from "@entities/comment/types"

export const deletePost = async (id: number) => {
  const response = await fetch(`/api/posts/${id}`, {
    method: "DELETE",
  })

  if (!response.ok) {
    throw new Error("Failed to delete a post")
  }

  const data: DeletedPost = await response.json()
  return data
}

export const fetchCommentsByPostId = async (postId: number) => {
  const response = await fetch(`/api/comments/post/${postId}`)

  if (!response.ok) {
    throw new Error("Failed to fetch a comment")
  }

  const data: CommentsResponse = await response.json()
  return data
}
