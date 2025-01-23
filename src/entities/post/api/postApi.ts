import { User } from "../../user/api/userApi"

export interface PostsTypes {
  posts: Post[]
  total: number
  skip: number
  limit: number
}

export interface Post {
  id: number
  title: string
  body: string
  tags: string[]
  reactions: Reactions
  views: number
  userId: User["id"]
}

export interface Reactions {
  likes: number
  dislikes: number
}

export interface CreatePostParams {
  body: {
    title: string
    body: string
    userId: number
  }
}

export const postApi = {
  getPosts: async (limit: number, skip: number) => {
    try {
      const response = await fetch(`/api/posts?limit=${limit}&skip=${skip}`)
      return (await response.json()) as Post[]
    } catch (error) {
      console.error("GET /api/posts:", error)
    }
  },
  getPostsBySearch: async (searchQuery: string) => {
    try {
      const response = await fetch(`/api/posts/search?q=${searchQuery}`)
      return (await response.json()) as PostsTypes
    } catch (error) {
      console.error("GET /api/posts/search:", error)
    }
  },
  getPostsByTag: async (tag: string) => {
    try {
      const response = await fetch(`/api/posts/tag/${tag}`)
      return (await response.json()) as PostsTypes
    } catch (error) {
      console.error("GET /api/posts/tag:", error)
    }
  },
  createPost: async (newPost: CreatePostParams["body"]) => {
    try {
      const response = await fetch("/api/posts/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPost),
      })
      return (await response.json()) as Post
    } catch (error) {
      console.error("POST /api/posts/add:", error)
    }
  },
  updatePost: async (post: Post) => {
    try {
      const response = await fetch(`/api/posts/${post.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(post),
      })
      return (await response.json()) as Post
    } catch (error) {
      console.error("PUT /api/posts/:id:", error)
    }
  },
  deletePost: async (postId: Post["id"]) => {
    try {
      await fetch(`/api/posts/${postId}`, { method: "DELETE" })
    } catch (error) {
      console.error("DELETE /api/posts/:id:", error)
    }
  },
}
