import { create } from "zustand"
import { Post } from "./type"

interface PostState {
  posts: Post[]
  addPost: (post: Post) => void
  updatePost: (updatedPost: Post) => void
  deletePost: (id: number) => void
}

export const usePostStore = create<PostState>((set) => ({
  posts: [],
  addPost: (post: Post) =>
    set((state) => ({
      posts: [...state.posts, post],
    })),
  updatePost: (updatedPost: Post) =>
    set((state) => ({
      posts: state.posts.map((post) => (post.id === updatedPost.id ? updatedPost : post)),
    })),
  deletePost: (id: number) =>
    set((state) => ({
      posts: state.posts.filter((post) => post.id !== id),
    })),
}))
