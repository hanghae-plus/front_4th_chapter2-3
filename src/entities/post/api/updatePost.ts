import { Post } from "@entities/post/types"

export const updatePost = async (post: Post | null) => {
  if (!post) return

  const response = await fetch(`/api/posts/${post.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(post),
  })

  if (!response.ok) {
    throw new Error("Failed to update post")
  }

  const data: Post = await response.json()
  return data
}
