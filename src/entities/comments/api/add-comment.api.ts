import { Comment } from "../model/types"

async function addComment(comment: Comment) {
  const response = await fetch("/api/comments/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(comment),
  })
  const data = await response.json()
  return data
}

export { addComment }
