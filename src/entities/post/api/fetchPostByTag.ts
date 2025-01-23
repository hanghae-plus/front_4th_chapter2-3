import { PostResponse } from "@entities/post/types"

export const fetchPostByTag = async (tag: string) => {
  const response = await fetch(`/api/posts/tag/${tag}`)
  const data: PostResponse = await response.json()
  return data
}
