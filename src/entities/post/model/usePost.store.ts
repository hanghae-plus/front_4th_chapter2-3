import { create } from "zustand"
import { Post } from "../../post/model/types"

const usePostStore = create<{
  posts: Post[]
  addPost: (post: Post) => void
  updatePost: (post: Post) => void
  removePost: (post: Post) => void
  setPosts: (posts: Post[]) => void
}>((set) => ({
  posts: [],
  addPost: (post: Post) => {
    set((state) => ({ posts: [post, ...state.posts] }))
  },
  updatePost: (post: Post) => {
    set((state) => ({
      posts: state.posts.map((p) => (p.id === post.id ? post : p)),
    }))
  },
  removePost: (post: Post) => {
    set((state) => ({
      posts: state.posts.filter((p) => p.id !== post.id),
    }))
  },
  setPosts: (posts: Post[]) => {
    set(() => ({ posts }))
  },
}))

export { usePostStore }
