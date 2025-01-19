import { NewPost, Post } from "../models/types"

// TODO: 에러 처리 필요 : 심화과제 tanstack에서 처리할 예정
export const getPostList = async (limit: number, skip: number) => {
  const response = await fetch(`/api/posts?limit=${limit}&skip=${skip}`)
  const data = await response.json()
  return data
}

export const getPostTags = async () => {
  const response = await fetch(`/api/posts/tags`)
  const data = await response.json()
  return data
}

export const getPostListByTag = async (tag: string) => {
  const response = await fetch(`/api/posts/tag/${tag}`)
  const data = await response.json()
  return data
}

export const getPostListBySearch = async (searchQuery: string) => {
  const response = await fetch(`/api/posts/search?q=${searchQuery}`)
  const data = await response.json()
  return data
}

export const postPost = async (post: NewPost) => {
  const response = await fetch(`/api/posts/add`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(post),
  })
  const data = await response.json()
  return data
}

export const putPost = async (post: Post) => {
  const response = await fetch(`/api/posts/${post.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(post),
  })
  const data = await response.json()
  return data
}

export const deletePost = async (id: number) => {
  const response = await fetch(`/api/posts/${id}`, {
    method: 'DELETE',
  })
  const data = await response.json()
  return data
}
