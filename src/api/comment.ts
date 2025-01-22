import { Comment, Comments, NewComment } from "../types/comment"

export const getComments = async (postId: number): Promise<Comments> => {
  const response = await fetch(`/api/comments/post/${postId}`)
  const data = (await response.json()) as Comments
  return data
}

export const addComment = async (newComment: NewComment) => {
  const response = await fetch("/api/comments/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newComment),
  })
  const data = (await response.json()) as Comment
  return data
}

export const deleteComment = async (id: number) => {
  await fetch(`/api/comments/${id}`, {
    method: "DELETE",
  })
}

export const likeComment = async ({ id, likes }: { id: number; likes: number }) => {
  const response = await fetch(`/api/comments/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ likes: likes + 1 }),
  })
  const data = (await response.json()) as Comment

  return data
}

export const updateComment = async (selectedComment: Comment) => {
  const response = await fetch(`/api/comments/${selectedComment.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ body: selectedComment.body }),
  })
  const data = await response.json()
  return data
}
