import { Tag } from "../types/tag"

export const getTags = async (): Promise<Tag[]> => {
  const response = await fetch("/api/posts/tags")
  const data = await response.json()
  return data
}
