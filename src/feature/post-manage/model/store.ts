import { create } from "zustand"
import { Post } from "../../../entities/post/model/types"

interface PostStore {
  // 상태
  posts: Post[]
  total: number
  loading: boolean
  searchQuery: string
  selectedTag: string | undefined
  tags: string[]
  skip: number
  limit: number
  sortBy: string
  sortOrder: "asc" | "desc"

  // 액션
  setPosts: (posts: Post[]) => void
  setTotal: (total: number) => void
  setLoading: (loading: boolean) => void
  setSearchQuery: (query: string) => void
  setSelectedTag: (tag: string | undefined) => void
  setTags: (tags: string[]) => void
  setSkip: (skip: number) => void
  setLimit: (limit: number) => void
  setSortBy: (sortBy: string) => void
  setSortOrder: (order: "asc" | "desc") => void

  // 비즈니스 로직
  fetchPosts: () => Promise<void>
  fetchTags: () => Promise<void>
  searchPosts: () => Promise<void>
  fetchPostsByTag: (tag: string) => Promise<void>
  deletePost: (id: number) => Promise<void>
  updateURL: () => void
}

export const usePostStore = create<PostStore>((set, get) => ({
  // 초기 상태
  posts: [],
  total: 0,
  loading: false,
  searchQuery: "",
  selectedTag: undefined,
  tags: [],
  skip: 0,
  limit: 10,
  sortBy: "id",
  sortOrder: "asc",

  // 액션
  setPosts: (posts) => set({ posts }),
  setTotal: (total) => set({ total }),
  setLoading: (loading) => set({ loading }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setSelectedTag: (tag) => set({ selectedTag: tag }),
  setTags: (tags) => set({ tags }),
  setSkip: (skip) => set({ skip }),
  setLimit: (limit) => set({ limit }),
  setSortBy: (sortBy) => set({ sortBy }),
  setSortOrder: (order) => set({ sortOrder: order }),

  // 비즈니스 로직
  fetchPosts: async () => {
    const { limit, skip, sortBy, sortOrder } = get()
    set({ loading: true })
    try {
      const response = await fetch(`https://dummyjson.com/posts?limit=${limit}&skip=${skip}&select=title,body,tags,id`)
      const data = await response.json()
      set({ posts: data.posts, total: data.total })
    } catch (error) {
      console.error("Failed to fetch posts:", error)
    } finally {
      set({ loading: false })
    }
  },

  fetchTags: async () => {
    try {
      const response = await fetch("https://dummyjson.com/posts/tags")
      const tags = await response.json()
      set({ tags })
    } catch (error) {
      console.error("Failed to fetch tags:", error)
    }
  },

  searchPosts: async () => {
    const { searchQuery, limit } = get()
    if (!searchQuery.trim()) {
      get().fetchPosts()
      return
    }
    set({ loading: true })
    try {
      const response = await fetch(
        `https://dummyjson.com/posts/search?q=${searchQuery}&limit=${limit}&select=title,body,tags,id`,
      )
      const data = await response.json()
      set({ posts: data.posts, total: data.total })
    } catch (error) {
      console.error("Failed to search posts:", error)
    } finally {
      set({ loading: false })
    }
  },

  fetchPostsByTag: async (tag: string) => {
    set({ loading: true })
    try {
      // DummyJSON doesn't have a direct endpoint for filtering by tags
      // So we'll fetch all posts and filter client-side
      const response = await fetch("https://dummyjson.com/posts?limit=150")
      const data = await response.json()
      const filteredPosts = data.posts.filter((post: Post) => post.tags.includes(tag))
      set({
        posts: filteredPosts,
        total: filteredPosts.length,
        selectedTag: tag,
      })
    } catch (error) {
      console.error("Failed to fetch posts by tag:", error)
    } finally {
      set({ loading: false })
    }
  },

  deletePost: async (id: number) => {
    try {
      await fetch(`https://dummyjson.com/posts/${id}`, {
        method: "DELETE",
      })
      const { posts } = get()
      set({ posts: posts.filter((post) => post.id !== id) })
    } catch (error) {
      console.error("Failed to delete post:", error)
    }
  },

  updateURL: () => {
    const { searchQuery, selectedTag, skip, limit, sortBy, sortOrder } = get()
    const params = new URLSearchParams()

    if (searchQuery) params.set("q", searchQuery)
    if (selectedTag) params.set("tag", selectedTag)
    if (skip > 0) params.set("skip", skip.toString())
    if (limit !== 10) params.set("limit", limit.toString())
    if (sortBy) params.set("sortBy", sortBy)
    if (sortOrder !== "asc") params.set("order", sortOrder)

    const newURL = `${window.location.pathname}${params.toString() ? "?" + params.toString() : ""}`
    window.history.pushState({}, "", newURL)
  },
}))
