import { create } from "zustand"
import { Post } from "./types"

interface PostState {
  posts: Post[]
  setPosts: (posts: Post[]) => void
  selectedPost: Post | null
  setSelectedPost: (post: Post | null) => void
  updateSelectedPost: (updates: Partial<Post>) => void
  resetSelectedPost: () => void
}

const usePostStore = create<PostState>()((set) => ({
  posts: [],

  setPosts: (posts) => set({ posts }),

  selectedPost: null,

  setSelectedPost: (post) => set({ selectedPost: post }),

  updateSelectedPost: (updates) =>
    set((state) => ({
      selectedPost: state.selectedPost ? { ...state.selectedPost, ...updates } : null,
    })),

  resetSelectedPost: () => set({ selectedPost: null }),
}))

export { usePostStore }
