import axios, { AxiosResponse } from "axios"
import { Comment, newComment } from "../model/type"

export const getComments = async (postId: number): Promise<AxiosResponse> => {
  const response = await axios.get(`/api/comments/post/${postId}`)
  return response.data.json()
}

export const addComment = async (newComment: newComment): Promise<AxiosResponse> => {
  const response = await axios.post(`/api/comments/add`, {
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newComment),
  })
  return response.data.json()
}

export const updateComment = async (selectedComment: Comment): Promise<AxiosResponse> => {
  const response = await axios.put(`/api/comments/${selectedComment.id}`, {
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ body: selectedComment.body }),
  })
  return response.data.json()
}

export const deleteComment = async (id: number): Promise<AxiosResponse> => {
  const response = await axios.delete(`/api/comments/${id}`)
  return response.data.json()
}

export const likeComment = async (id: number, likesComment: { likes: number }): Promise<AxiosResponse> => {
  const response = await axios.patch(`/api/comments/${id}`, {
    headers: { "Content-Type": "application/json" },
    body: likesComment,
  })
  return response.data.json()
}
