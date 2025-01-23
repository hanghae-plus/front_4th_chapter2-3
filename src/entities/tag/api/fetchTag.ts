import type { TagWithPost } from "../model/types/tag"

export const fetchTag = async (tag: string): Promise<TagWithPost | undefined> => {
  try {
    const response = await fetch(`/api/posts/tag/${tag}`)
    const data = await response.json()
    return data
  } catch (error) {
    throw error
  }
}
