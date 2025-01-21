import { create } from "zustand"
import { Post } from "@/entities/post/model/types"

interface PostStore {
  posts: Post[]
  setPosts: (posts: Post[]) => void
}

export const usePost = create<PostStore>((set, get) => ({
  posts: [],

  setPosts: (posts: Post[]) => set({ posts: posts }),
}))
