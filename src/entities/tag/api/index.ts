import { Tag } from "../model/type"

export const getTags = async (): Promise<Tag[]> => {
  const response = await fetch("/api/posts/tags")
  const data = await response.json()
  return data
}
