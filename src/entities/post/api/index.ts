import { PostResponse } from "../types"

export const fetchPosts = async (limit: number, skip: number) => {
  const response = await fetch(`/api/posts?limit=${limit}&skip=${skip}`)
  const data: PostResponse = await response.json()
  return data
}
