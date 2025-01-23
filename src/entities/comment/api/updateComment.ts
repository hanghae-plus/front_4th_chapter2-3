import type { Comment } from "../model/types/comments"

export const updateComment = async (selectedComment: Comment) => {
  try {
    const response = await fetch(`/api/comments/${selectedComment.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ body: selectedComment.body }),
    })
    const data = await response.json()

    return data
  } catch (error) {
    throw error
  }
}
