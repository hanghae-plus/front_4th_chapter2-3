import type { NewComment } from "../model/types/comments"

export const addComment = async (newComment: NewComment) => {
  try {
    const response = await fetch("/api/comments/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newComment),
    })
    const data = await response.json()

    return data
  } catch (error) {
    throw error
  }
}
