import axios from "axios"
import { Post, CreatePostDto } from "../model/types"

export const PostApi = {
  getPosts: async (limit: number, skip: number): Promise<Post[]> => {
    const { data } = await axios.get(`/api/posts?limit=${limit}&skip=${skip}`)
    return data
  },

  addPost: async (newPost: CreatePostDto): Promise<Post> => {
    const { data } = await axios.post("/api/posts/add", newPost)
    return data
  },

  editPost: async (editedPost: Post): Promise<Post> => {
    const { data } = await axios.put(`/api/posts/${editedPost.id}`, editedPost)
    return data
  },

  deletePost: async (id: number): Promise<void> => {
    await axios.delete(`/api/posts/${id}`)
  },
}
