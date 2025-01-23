import { Comment } from "@entities/comment/types"

export const updateComment = async (comment: Comment) => {
  const response = await fetch(`/api/comments/${comment.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ body: comment.body }),
  })

  if (!response.ok) {
    throw new Error("Failed to update comment")
  }

  const data: Comment = await response.json()
  return data
}
