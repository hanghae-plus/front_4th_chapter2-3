import axios, { AxiosResponse } from "axios"
import { newPost, Post } from "../model/type"

export const getPosts = async (limit: number, skip: number): Promise<AxiosResponse> => {
  const response = await axios.get(`/api/posts?limit=${limit}&skip=${skip}`)
  return response.data.json()
}

export const getPostsByTag = async (tag: string): Promise<AxiosResponse> => {
  const response = await axios.get(`/api/posts/tag/${tag}`)
  return response.data.json()
}

export const getPostsByQuery = async (searchQuery: string): Promise<AxiosResponse> => {
  const response = await axios.get(`/api/posts/search?q=${searchQuery}`)
  return response.data.json()
}

export const addPost = async (newPost: newPost): Promise<AxiosResponse> => {
  const response = await axios.post(`/api/posts/add`, {
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newPost),
  })
  return response.data.json()
}

export const updatePost = async (selectedPost: Post): Promise<AxiosResponse> => {
  const response = await axios.put(`/api/posts/${selectedPost.id}`, {
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(selectedPost),
  })
  return response.data.json()
}

export const deletePost = async (postId: number): Promise<AxiosResponse> => {
  const response = await axios.delete(`/api/posts/${postId}`)
  return response.data.json()
}
