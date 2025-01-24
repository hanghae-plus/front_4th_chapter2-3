import { Post } from "../model/types"

export const getPostsApi = async ({ limit, skip }) => {
  const response = await fetch(`/api/posts?limit=${limit}&skip=${skip}`)
  return await response.json()
}

export const getPostsbyTagApi = async ({ tag }) => {
  const response = await fetch(`/api/posts/tag/${tag}`)
  return await response.json()
}

export const updateePostApi = async (post: Post) => {
  const response = await fetch(`/api/posts/${post.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(post),
  })

  return await response.json()
}

export const searchPostsApi = async (searchQuery: string) => {
  const response = await fetch(`/api/posts/search?q=${searchQuery}`)
  return await response.json()
}
export const deletePostApi = async (id: number) => {
  await fetch(`/api/posts/${id}`, {
    method: "DELETE",
  })
}
