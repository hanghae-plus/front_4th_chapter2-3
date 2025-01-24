import { Post } from "../../../entities/post/model/types"
import { User } from "../../../entities/user/model/types"

export const postApi = {
  getPosts: async ({ limit, skip }: { limit: number; skip: number }) => {
    const [postsResponse, usersResponse] = await Promise.all([
      fetch(`/api/posts?limit=${limit}&skip=${skip}`),
      fetch("/api/users?limit=0&select=username,image"),
    ])

    const postsData = await postsResponse.json()
    const usersData = await usersResponse.json()

    const postsWithUsers = postsData.posts.map((post: Post) => ({
      ...post,
      author: usersData.users.find((user: User) => user.id === post.userId),
    }))

    return {
      posts: postsWithUsers,
      total: postsData.total,
      users: usersData.users,
    }
  },
  searchPosts: async (query: string) => {
    const response = await fetch(`/api/posts/search?q=${query}`)
    return response.json()
  },
  getPostsByTag: async (tag: string) => {
    const response = await fetch(`/api/posts/tag/${tag}`)
    return response.json()
  },
  addPost: async (post: any) => {
    const response = await fetch("/api/posts/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(post),
    })
    return response.json()
  },
  updatePost: async (id: number, post: any) => {
    const response = await fetch(`/api/posts/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(post),
    })
    return response.json()
  },
  deletePost: async (id: number) => {
    await fetch(`/api/posts/${id}`, { method: "DELETE" })
  },
}
