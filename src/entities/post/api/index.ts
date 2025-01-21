import { Post, PostsResponse } from "@entities/post/model"
import { User, UsersResponse } from "@entities/user/model"

export const postsApi = {
  fetchPosts: async (limit: number, skip: number) => {
    try {
      const [postsResponse, usersResponse] = await Promise.all([
        fetch(`/api/posts?limit=${limit}&skip=${skip}`),
        fetch("/api/users?limit=0&select=username,image"),
      ])

      const postsData = (await postsResponse.json()) as PostsResponse
      const usersData = (await usersResponse.json()) as UsersResponse

      return {
        posts: postsData.posts.map((post: Post) => ({
          ...post,
          author: usersData.users.find((user) => user.id === post.userId),
        })),
        total: postsData.total,
      }
    } catch (error) {
      console.error("게시물 가져오기 오류:", error instanceof Error ? error.message : "알 수 없는 오류")
      throw error
    }
  },

  searchPosts: async (query: string) => {
    try {
      const response = await fetch(`/api/posts/search?q=${query}`)
      return response.json()
    } catch (error) {
      console.error("게시물 검색 오류:", error)
      throw error
    }
  },

  fetchPostsByTag: async (tag: string) => {
    try {
      const [postsResponse, usersResponse] = await Promise.all([
        fetch(`/api/posts/tag/${tag}`),
        fetch("/api/users?limit=0&select=username,image"),
      ])
      const postsData = await postsResponse.json()
      const usersData = await usersResponse.json()

      return {
        posts: postsData.posts.map((post: Post) => ({
          ...post,
          author: usersData.users.find((user: User) => user.id === post.userId),
        })),
        total: postsData.total,
      }
    } catch (error) {
      console.error("태그별 게시물 가져오기 오류:", error)
      throw error
    }
  },

  addPost: async (post: Omit<Post, "id">) => {
    try {
      const response = await fetch("/api/posts/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(post),
      })
      return response.json()
    } catch (error) {
      console.error("게시물 추가 오류:", error)
      throw error
    }
  },

  updatePost: async (post: Post) => {
    try {
      const response = await fetch(`/api/posts/${post.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(post),
      })
      return response.json()
    } catch (error) {
      console.error("게시물 업데이트 오류:", error)
      throw error
    }
  },

  deletePost: async (id: number) => {
    try {
      await fetch(`/api/posts/${id}`, {
        method: "DELETE",
      })
    } catch (error) {
      console.error("게시물 삭제 오류:", error)
      throw error
    }
  },

  fetchTags: async () => {
    try {
      const response = await fetch("/api/posts/tags")
      return response.json()
    } catch (error) {
      console.error("태그 가져오기 오류:", error)
      throw error
    }
  },
}
