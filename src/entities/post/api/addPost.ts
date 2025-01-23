import type { Post } from "../model/types/post"

export const addPost = async (newPost: Post): Promise<Post[] | undefined> => {
  try {
    const response = await fetch("/api/posts/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPost),
    })
    const data = await response.json()

    return data
  } catch (error) {
    throw error
  }
}
