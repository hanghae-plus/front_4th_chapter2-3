import { PostResponse, TagResponse } from "../types"

export const fetchPosts = async (limit: number, skip: number) => {
  const response = await fetch(`/api/posts?limit=${limit}&skip=${skip}`)
  const data: PostResponse = await response.json()
  return data
}

export const fetchTags = async () => {
  const response = await fetch("/api/posts/tags")
  const data: TagResponse = await response.json()
  return data
}
