import { Comment } from "@entities/comment/types"

export const likeComment = async (id: number, likes: { likes: number }) => {
  const response = await fetch(`/api/comments/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(likes),
  })

  if (!response.ok) {
    throw new Error("Failed to fetch a comment")
  }
  const data: Comment = await response.json()
  return data
}
