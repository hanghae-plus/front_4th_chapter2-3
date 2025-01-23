import type { PostsResponse } from "../model/types/post"

export const fetchPosts = async (limit: number, skip: number): Promise<PostsResponse | undefined> => {
  try {
    const response = await fetch(`/api/posts?limit=${limit}&skip=${skip}`)
    const data = response.json()
    return data
  } catch (error) {
    throw error
  }
}
