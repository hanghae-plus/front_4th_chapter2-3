import { NewComment, Comment } from '../models/types'

export const getComments = async (postId: number) => {
  const response = await fetch(`/api/comments/post/${postId}`)
  const data = await response.json()
  return data
}

export const postComment = async (comment: NewComment) => {
  const response = await fetch(`/api/comments/add`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(comment),
  })
  const data = await response.json()
  return data
}

export const putComment = async (comment: Comment) => {
  const response = await fetch(`/api/comments/${comment.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(comment),
  })
  const data = await response.json()
  return data
}

export const deleteComment = async (id: number) => {
  const response = await fetch(`/api/comments/${id}`, {
    method: 'DELETE',
  })
  const data = await response.json()
  return data
}

export const patchComment = async (id: number, likes: number) => {
  const response = await fetch(`/api/comments/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ likes }),
  })
  const data = await response.json()
  return data
}
