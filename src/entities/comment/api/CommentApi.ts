import axios, { AxiosResponse } from "axios"
import { Comment, newComment } from "../model/type"

export const getComments = async (postId: number): Promise<AxiosResponse> => {
  const response = await axios.get(`/api/comments/post/${postId}`)
  return response.data
}

export const addComment = async (newComment: newComment): Promise<AxiosResponse> => {
  const response = await axios.post(`/api/comments/add`, {
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newComment),
  })
  return response.data
}

export const updateComment = async (updatedComment: Comment): Promise<AxiosResponse> => {
  const response = await axios.put(`/api/comments/${updatedComment.id}`, {
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ body: updatedComment.body }),
  })
  return response.data
}

export const deleteComment = async (id: number): Promise<AxiosResponse> => {
  const response = await axios.delete(`/api/comments/${id}`)
  return response.data
}

export const likeComment = async (id: number, likesComment: { likes: number }): Promise<AxiosResponse> => {
  const response = await axios.patch(`/api/comments/${id}`, {
    headers: { "Content-Type": "application/json" },
    body: likesComment,
  })
  return response.data
}
