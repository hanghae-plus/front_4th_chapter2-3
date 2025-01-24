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
  showAddDialog: boolean
  showEditDialog: boolean

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
  setShowAddDialog: (show: boolean) => void
  setShowEditDialog: (show: boolean) => void
  handleAddPost: () => void
  handleEditPost: (post: Post) => void
  handleSubmitAdd: () => void
  handleSubmitEdit: () => void

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
  showAddDialog: false,
  showEditDialog: false,

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
  setShowAddDialog: (show) => set({ showAddDialog: show }),
  setShowEditDialog: (show) => set({ showEditDialog: show }),

  handleAddPost: () => {
    set({ showAddDialog: true })
  },

  handleEditPost: (post) => {
    set({
      selectedPost: post,
      showEditDialog: true,
    })
  },

  handleSubmitAdd: () => {
    const { newPost, addPost } = get()
    addPost(newPost)
    set({ showAddDialog: false })
  },

  handleSubmitEdit: () => {
    const { selectedPost, updatePost } = get()
    if (selectedPost) {
      updatePost(selectedPost)
      set({ showEditDialog: false })
    }
  },

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

      // 작성자 정보를 가져오기 위해 users API 호출
      const usersResponse = await fetch("/api/users?limit=0&select=username,image")
      if (!usersResponse.ok) {
        throw new Error("사용자 정보를 가져오는데 실패했습니다")
      }
      const usersData = await usersResponse.json()

      // 작성자 정보를 포함한 새 포스트 데이터
      const postWithAuthor = {
        ...data,
        author: usersData.users.find((user: { id: number }) => user.id === newPost.userId) || null,
      }

      set((state) => ({
        posts: [postWithAuthor, ...state.posts],
        newPost: { title: "", body: "", userId: 1 }, // 기본값으로 리셋
        showPostDetailDialog: false,
      }))
    } catch (error) {
      console.error("게시물 추가 오류:", error)
    }
  },

  updatePost: async (post) => {
    try {
      const data = await postsApi.updatePost(post)
      set((state) => ({
        posts: state.posts.map((p) =>
          p.id === data.id
            ? { ...data, author: p.author } // 기존 작성자 정보 유지
            : p,
        ),
        showPostDetailDialog: false, // 모달 닫기
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
