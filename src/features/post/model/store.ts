import { create } from "zustand"
import { NewPost, Post } from "../../../entities/post/model/types"

interface PostStore {
  posts: Post[]
  selectedPost: Post | null
  newPost: Partial<NewPost>
  setPosts: (posts: Post[]) => void
  setSelectedPost: (post: Post | null) => void
  setNewPost: (newComment: Partial<NewPost>) => void
}

export const usePostStore = create<PostStore>((set) => ({
  posts: [],
  selectedPost: null,
  newPost: { title: "", body: "", userId: 1 },
  setPosts: (posts) => {
    set({ posts: posts })
  },
  setSelectedPost: (post) => {
    set({ selectedPost: post })
  },
  setNewPost: (post) => {
    set({ newPost: post })
  },
}))
