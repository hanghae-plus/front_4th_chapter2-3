import { Comment, CommentForm } from "../model/types"

export const getCommentsApi = async (postId) => {
  const response = await fetch(`/api/comments/post/${postId}`)
  const data = await response.json()

  return data.comments
}

export const addCommentApi = async (comment: CommentForm) => {
  const response = await fetch("/api/comments/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(comment),
  })
  const data = await response.json()
  return data
}

export const deleteCommentApi = async (id) => {
  await fetch(`/api/comments/${id}`, {
    method: "DELETE",
  })
}
export const updateCommentLikeApi = async (id, params) => {
  const response = await fetch(`/api/comments/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(params),
  })
  return await response.json()
}

export const updateCommentApi = async (id, params) => {
  const response = await fetch(`/api/comments/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(params),
  })
  return await response.json()
}
