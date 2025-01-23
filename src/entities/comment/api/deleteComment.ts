import { Comment } from "@entities/comment/types"

export const deleteComment = async (id: number) => {
  const response = await fetch(`/api/comments/${id}`, {
    method: "DELETE",
  })

  if (!response.ok) {
    throw new Error("Failed to delete a comment")
  }

  const data: Comment = await response.json()
  return data
}
