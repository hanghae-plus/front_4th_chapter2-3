import { PostsAPI } from '../api/post.api'
import { NewPost, Post } from '../models/types'

export const getPostList = async (limit: number, skip: number) => {
  const response = await PostsAPI.getList(limit, skip)
  const data = await response.json()
  return data
}

export const getPostTags = async () => {
  const response = await PostsAPI.getTags()
  const data = await response.json()
  return data
}

export const getPostListByTag = async (tag: string) => {
  const response = await PostsAPI.getByTag(tag)
  const data = await response.json()
  return data
}

export const getPostListBySearch = async (query: string) => {
  const response = await PostsAPI.search(query)
  const data = await response.json()
  return data
}

export const postPost = async (post: NewPost) => {
  const response = await PostsAPI.create(post)
  const data = await response.json()
  return data
}

export const putPost = async (post: Post) => {
  const response = await PostsAPI.update(post)
  const data = await response.json()
  return data
}

export const deletePost = async (id: number) => {
  const response = await PostsAPI.delete(id)
  const data = await response.json()
  return data
}
