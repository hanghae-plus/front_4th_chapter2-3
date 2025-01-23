import { PostResponse, SearchParams } from "@entities/post/types"

export const fetchPosts = async ({ limit, skip, sortBy, sortOrder }: SearchParams) => {
  const response = await fetch(`/api/posts?limit=${limit}&skip=${skip}&sortBy=${sortBy}&order=${sortOrder}`)
  const data: PostResponse = await response.json()
  return data
}
