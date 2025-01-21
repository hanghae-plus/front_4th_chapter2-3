import { CommentsAPI } from '../api/comments.api'
import { Comment, NewComment } from '../models/types'

export const getComments = async (postId: number) => {
  const response = await CommentsAPI.getByPostId(postId)
  const data = await response.json()
  return data
}

export const postComment = async (comment: NewComment) => {
  const response = await CommentsAPI.create(comment)
  const data = await response.json()
  return data
}

export const putComment = async (comment: Comment) => {
  const response = await CommentsAPI.update(comment)
  const data = await response.json()
  return data
}

export const deleteComment = async (id: number) => {
  const response = await CommentsAPI.delete(id)
  const data = await response.json()
  return data
}

export const patchComment = async (id: number, likes: number) => {
  const response = await CommentsAPI.updateLikes(id, likes)
  const data = await response.json()
  return data
}
