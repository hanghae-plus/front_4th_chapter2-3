import { create } from "zustand"
import { newPost, Post } from "./type"
import { addPost, deletePost, getPosts, updatePost } from "../api"

interface PostState {
  posts: Post[]
  fetchPosts: (limit: number, skip: number) => Promise<void>
  addPost: (newPost: newPost) => void
  updatePost: (updatedPost: Post) => void
  deletePost: (id: number) => void
}

export const usePostStore = create<PostState>((set) => ({
  posts: [],
  fetchPosts: async (limit, skip) => {
    try {
      const response = await getPosts(limit, skip)
      set({ posts: response.posts })
    } catch (error) {
      console.error("게시물 가져오기 오류:", error)
    }
  },
  addPost: async (newPost: newPost) => {
    try {
      const response = await addPost(newPost)
      set((state) => ({
        posts: [...state.posts, response.data],
      }))
    } catch (error) {
      console.error("게시물 추가 오류:", error)
    }
  },
  updatePost: async (updatedPost: Post) => {
    try {
      const response = await updatePost(updatedPost)
      set((state) => ({
        posts: state.posts.map((post) => (post.id === response.data.id ? response.data : post)),
      }))
    } catch (error) {
      console.error("게시물 업데이트 오류:", error)
    }
  },
  deletePost: async (id: number) => {
    try {
      const response = await deletePost(id)
      set((state) => ({
        posts: state.posts.filter((post) => post.id !== response.data.id),
      }))
    } catch (error) {
      console.error("게시물 삭제 오류:", error)
    }
  },
}))
