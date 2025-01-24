import { Tag } from "@entities/post/types"

export const fetchTags = async () => {
  const response = await fetch("/api/posts/tags")
  const data: Tag[] = await response.json()
  return data
}
