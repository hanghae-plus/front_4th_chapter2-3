import { create } from "zustand"
import { Post } from "@/entities/post/model/types"
import { postApi } from "@/entities/post/api/postApi"
import { userApi } from "@/entities/user/api/userApi"

interface PostStore {
  posts: Post[]
  total: number
  skip: number
  limit: number
  loading: boolean

  setPosts: (posts: Post[]) => void
  setTotal: (total: number) => void
  setSkip: (skip: number) => void
  setLimit: (limit: number) => void
  setLoading: (loading: boolean) => void

  fetchPosts: () => void
}

export const usePost = create<PostStore>((set, get) => ({
  posts: [],
  total: 0,
  loading: false,
  skip: 0,
  limit: 10,

  setPosts: (posts: Post[]) => set({ posts: posts }),
  setTotal: (total: number) => set({ total: total }),
  setSkip: (skip: number) => set({ skip: skip }),
  setLimit: (limit: number) => set({ limit: limit }),
  setLoading: (loading: boolean) => set({ loading: loading }),

  // 게시물 가져오기
  fetchPosts: async () => {
    const { skip, limit } = get()
    set({ loading: true })

    try {
      const [postsData, usersData] = await Promise.all([
        await postApi.getPosts({ limit, skip }),
        await userApi.getUsers({ limit: 0, select: "username,image" }),
      ])

      const postsWithUsers = postsData.posts.map((post) => ({
        ...post,
        author: usersData.users.find((user) => user.id === post.userId) ?? {
          id: post.userId,
          image: "",
          username: "",
        },
      }))

      set({ posts: postsWithUsers, total: postsData.total })
    } catch (e) {
      console.error("게시물 가져오기 오류:", e)
    } finally {
      set({ loading: false })
    }
  },
}))
