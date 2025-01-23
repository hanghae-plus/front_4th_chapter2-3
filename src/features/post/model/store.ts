import { create } from "zustand"
import { CreatePost, Post } from "@/entities/post/model/types"
import { postApi } from "@/entities/post/api/postApi"
import { userApi } from "@/entities/user/api/userApi"
import { postsWithUsers } from "@/entities/post/lib"
import { usePostUrlStore } from "../post-url/model"
import { INITIAL_NEW_POST_STATE } from "@/entities/post/model/constants"

interface PostStore {
  posts: Post[]
  total: number
  skip: number
  limit: number
  loading: boolean
  newPost: CreatePost
  showAddDialog: boolean

  setPosts: (posts: Post[]) => void
  setTotal: (total: number) => void
  setSkip: (skip: number) => void
  setLimit: (limit: number) => void
  setLoading: (loading: boolean) => void
  setNewPost: (post: CreatePost) => void

  // 다이얼로그 상태 임시로
  setShowAddDialog: (open: boolean) => void

  fetchPosts: () => void
  fetchPostsByTag: (tag: string) => void
  searchPosts: () => void
  addPost: () => void
}

export const usePost = create<PostStore>((set, get) => ({
  posts: [],
  total: 0,
  loading: false,
  skip: 0,
  limit: 10,
  newPost: INITIAL_NEW_POST_STATE,

  showAddDialog: false,

  setPosts: (posts: Post[]) => set({ posts: posts }),
  setTotal: (total: number) => set({ total: total }),
  setSkip: (skip: number) => set({ skip: skip }),
  setLimit: (limit: number) => set({ limit: limit }),
  setLoading: (loading: boolean) => set({ loading: loading }),
  setNewPost: (post: CreatePost) => set({ newPost: post }),

  setShowAddDialog: (open: boolean) => set({ showAddDialog: open }),

  // 게시물 가져오기
  fetchPosts: async () => {
    const { skip, limit } = get()
    set({ loading: true })

    try {
      const [postsData, usersData] = await Promise.all([
        await postApi.getPosts({ limit, skip }),
        await userApi.getUsers({ limit: 0, select: "username,image" }),
      ])

      const posts = postsWithUsers(postsData, usersData)

      set({ posts: posts, total: postsData.total })
    } catch (error) {
      console.error("게시물 가져오기 오류:", error)
    } finally {
      set({ loading: false })
    }
  },

  // 태그별 게시물 가져오기
  fetchPostsByTag: async (tag: string) => {
    if (!tag || tag === "all") {
      const { fetchPosts } = get()
      fetchPosts()
      return
    }

    set({ loading: true })

    try {
      const [postsData, usersData] = await Promise.all([
        postApi.getPostsByTag(tag),
        userApi.getUsers({ limit: 0, select: "username,image" }),
      ])

      const posts = postsWithUsers(postsData, usersData)

      set({ posts: posts, total: postsData.total })
    } catch (error) {
      console.error("태그별 게시물 가져오기 오류:", error)
    } finally {
      set({ loading: false })
    }
  },

  // 게시물 검색
  searchPosts: async () => {
    const searchQuery = usePostUrlStore.getState().searchQuery

    if (!searchQuery) {
      const { fetchPosts } = get()
      fetchPosts()
      return
    }

    set({ loading: true })

    try {
      const data = await postApi.getSearchPosts({ q: searchQuery })
      set({ posts: data.posts, total: data.total })
    } catch (error) {
      console.error("게시물 검색 오류:", error)
    } finally {
      set({ loading: false })
    }
  },

  // 게시물 추가
  addPost: async () => {
    try {
      const { newPost, posts } = get()
      const data = await postApi.postAddPost(newPost)

      set({ posts: [data, ...posts], showAddDialog: false, newPost: INITIAL_NEW_POST_STATE })
    } catch (error) {
      console.error("게시물 추가 오류:", error)
    }
  },
}))
