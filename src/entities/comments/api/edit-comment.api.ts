import { Comment } from "../model/types"

async function editComment(comment: Comment) {
  const response = await fetch(`/api/comments/${comment.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ body: comment.body }),
  })
  const data = await response.json()
  return data
}

export { editComment }
