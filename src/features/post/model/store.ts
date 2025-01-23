import { create } from "zustand"
import { CreatePost, Post } from "@/entities/post/model/types"
import { postApi } from "@/entities/post/api/postApi"
import { userApi } from "@/entities/user/api/userApi"
import { filterPostById, mapPostsWithUsers, replacePost } from "@/entities/post/lib"
import { usePostUrlStore } from "../post-url/model"
import { INITIAL_NEW_POST_STATE } from "@/entities/post/model/constants"

interface PostStore {
  posts: Post[]
  total: number
  skip: number
  limit: number
  loading: boolean
  newPost: CreatePost
  selectedPost: Post | null

  setSkip: (skip: number) => void
  setLimit: (limit: number) => void
  setLoading: (loading: boolean) => void
  setNewPost: (post: CreatePost) => void
  setSelectedPost: (post: Post) => void

  // 다이얼로그 상태
  showAddDialog: boolean
  setShowAddDialog: (open: boolean) => void
  showEditDialog: boolean
  setShowEditDialog: (open: boolean) => void
  showPostDetailDialog: boolean
  setShowPostDetailDialog: (open: boolean) => void

  fetchPosts: () => void
  fetchPostsByTag: (tag: string) => void
  searchPosts: () => void
  addPost: () => void
  updatePost: () => void
  deletePost: (id: Post["id"]) => void
}

export const usePostStore = create<PostStore>((set, get) => ({
  posts: [],
  total: 0,
  loading: false,
  skip: 0,
  limit: 10,
  newPost: INITIAL_NEW_POST_STATE,
  selectedPost: null,
  
  setSkip: (skip: number) => set({ skip: skip }),
  setLimit: (limit: number) => set({ limit: limit }),
  setLoading: (loading: boolean) => set({ loading: loading }),
  setNewPost: (post: CreatePost) => set({ newPost: post }),
  setSelectedPost: (post) => set({ selectedPost: post }),

  showAddDialog: false,
  setShowAddDialog: (open: boolean) => set({ showAddDialog: open }),
  showEditDialog: false,
  setShowEditDialog: (open: boolean) => set({ showEditDialog: open }),
  showPostDetailDialog: false,
  setShowPostDetailDialog: (open: boolean) => set({ showPostDetailDialog: open }),

  // 게시물 가져오기
  fetchPosts: async () => {
    const { skip, limit } = get()
    set({ loading: true })

    try {
      const [postsData, usersData] = await Promise.all([
        await postApi.getPosts({ limit, skip }),
        await userApi.getUsers({ limit: 0, select: "username,image" }),
      ])

      const posts = mapPostsWithUsers(postsData, usersData)

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

      const posts = mapPostsWithUsers(postsData, usersData)

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

  // 게시물 업데이트
  updatePost: async () => {
    try {
      const { selectedPost, posts } = get()
      if (!selectedPost) {
        throw new Error("선택된 게시물이 없습니다.")
      }

      const data = await postApi.putUpdatePost(selectedPost.id, selectedPost)

      set({ posts: replacePost(posts, data) })
      set({ showEditDialog: false })
    } catch (error) {
      console.error("게시물 업데이트 오류:", error)
    }
  },

  // 게시물 삭제
  deletePost: async (id) => {
    try {
      const { posts } = get()
      await postApi.deletePost(id)
      set({ posts: filterPostById(posts, id) })
    } catch (error) {
      console.error("게시물 삭제 오류:", error)
    }
  },
}))
