import { create } from "zustand"
import { Post, PostTag } from "@entities/post/model"
import { postsApi } from "@entities/post/api"
import { useCommentStore } from "@features/comment/model/stores"

interface PostStore {
  posts: Post[]
  total: number
  skip: number
  limit: number
  searchQuery: string
  selectedTag: string
  sortBy: string
  sortOrder: "asc" | "desc"
  loading: boolean
  tags: PostTag[]
  selectedPost: Post | null
  newPost: Omit<Post, "id">
  showPostDetailDialog: boolean

  // actions
  setPosts: (posts: Post[]) => void
  setTotal: (total: number) => void
  setSkip: (skip: number) => void
  setLimit: (limit: number) => void
  setSearchQuery: (query: string) => void
  setSelectedTag: (tag: string) => void
  setSortBy: (sortBy: string) => void
  setSortOrder: (order: "asc" | "desc") => void
  setLoading: (loading: boolean) => void
  setTags: (tags: PostTag[]) => void
  setSelectedPost: (post: Post | null) => void
  setNewPost: (post: Omit<Post, "id">) => void
  setNewPostTitle: (title: string) => void
  setNewPostBody: (body: string) => void
  setShowPostDetailDialog: (show: boolean) => void

  // async actions
  fetchPosts: () => Promise<void>
  searchPosts: () => Promise<void>
  fetchPostsByTag: (tag: string) => Promise<void>
  addPost: (post: Omit<Post, "id">) => Promise<void>
  updatePost: (post: Post) => Promise<void>
  deletePost: (id: number) => Promise<void>
  fetchTags: () => Promise<void>
  openPostDetail: (post: Post) => void
}

export const usePostStore = create<PostStore>((set, get) => ({
  posts: [],
  total: 0,
  skip: 0,
  limit: 10,
  searchQuery: "",
  selectedTag: "",
  sortBy: "",
  sortOrder: "asc",
  loading: false,
  tags: [],
  selectedPost: null,
  newPost: { title: "", body: "", userId: 1 },
  showPostDetailDialog: false,

  setPosts: (posts) => set({ posts }),
  setTotal: (total) => set({ total }),
  setSkip: (skip) => set({ skip }),
  setLimit: (limit) => set({ limit }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setSelectedTag: (tag) => set({ selectedTag: tag }),
  setSortBy: (sortBy) => set({ sortBy }),
  setSortOrder: (order) => set({ sortOrder: order }),
  setLoading: (loading) => set({ loading }),
  setTags: (tags) => set({ tags }),
  setSelectedPost: (post) => set({ selectedPost: post }),
  setNewPost: (post) => set({ newPost: post }),
  setNewPostTitle: (title) =>
    set((state) => ({
      newPost: { ...state.newPost, title },
    })),
  setNewPostBody: (body) =>
    set((state) => ({
      newPost: { ...state.newPost, body },
    })),
  setShowPostDetailDialog: (show) => set({ showPostDetailDialog: show }),

  fetchPosts: async () => {
    const { limit, skip } = get()
    set({ loading: true })
    try {
      const data = await postsApi.fetchPosts(limit, skip)
      set({ posts: data.posts, total: data.total })
    } catch (error) {
      console.error("게시물 가져오기 오류:", error)
    } finally {
      set({ loading: false })
    }
  },

  searchPosts: async () => {
    const { searchQuery } = get()
    if (!searchQuery) {
      get().fetchPosts()
      return
    }
    set({ loading: true })
    try {
      const data = await postsApi.searchPosts(searchQuery)
      set({ posts: data.posts, total: data.total })
    } catch (error) {
      console.error("게시물 검색 오류:", error)
    } finally {
      set({ loading: false })
    }
  },

  fetchPostsByTag: async (tag: string) => {
    if (!tag || tag === "all") {
      get().fetchPosts()
      return
    }
    set({ loading: true })
    try {
      const data = await postsApi.fetchPostsByTag(tag)
      set({ posts: data.posts, total: data.total })
    } catch (error) {
      console.error("태그별 게시물 가져오기 오류:", error)
    } finally {
      set({ loading: false })
    }
  },

  addPost: async (newPost) => {
    try {
      const data = await postsApi.addPost(newPost)
      set((state) => ({ posts: [data, ...state.posts] }))
    } catch (error) {
      console.error("게시물 추가 오류:", error)
    }
  },

  updatePost: async (post) => {
    try {
      const data = await postsApi.updatePost(post)
      set((state) => ({
        posts: state.posts.map((p) => (p.id === data.id ? data : p)),
      }))
    } catch (error) {
      console.error("게시물 업데이트 오류:", error)
    }
  },

  deletePost: async (id) => {
    try {
      await postsApi.deletePost(id)
      set((state) => ({
        posts: state.posts.filter((post) => post.id !== id),
      }))
    } catch (error) {
      console.error("게시물 삭제 오류:", error)
    }
  },

  fetchTags: async () => {
    try {
      const data = await postsApi.fetchTags()
      set({ tags: data })
    } catch (error) {
      console.error("태그 가져오기 오류:", error)
    }
  },

  openPostDetail: (post) => {
    set({ selectedPost: post, showPostDetailDialog: true })
    if (post.id) {
      useCommentStore.getState().fetchComments(post.id)
    }
  },
}))
