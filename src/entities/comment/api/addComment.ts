import { Comment, RequestComment } from "@entities/comment/types"

export const addComment = async (newComment: RequestComment) => {
  const response = await fetch("/api/comments/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newComment),
  })

  if (!response.ok) {
    throw new Error("Failed to add a comment")
  }

  const data: Comment = await response.json()
  return data
}
