import type { PostWithUser } from "../model/types/post"

export const updatePost = async (selectedPost: PostWithUser) => {
  try {
    const response = await fetch(`/api/posts/${selectedPost.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(selectedPost),
    })
    const data = await response.json()

    return data
  } catch (error) {
    throw error
  }
}
