import { Post, RequestPost } from "@entities/post/types"

export const addPost = async (newPost: RequestPost) => {
  const response = await fetch("/api/posts/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newPost),
  })

  if (!response.ok) {
    throw new Error("Failed to add a post")
  }

  const data: Post = await response.json()
  return data
}
