import { apiClient } from "@/shared/api"
import { CreatePost, Post, PostsResponse, Tag } from "../model/types"

export const postApi = {
  /* --------------------------------
   * GET Requests
   * -------------------------------- */

  // 게시물 가져오기
  getPosts: async (params: { limit: number; skip: number }) => {
    const response = await apiClient.get<PostsResponse>("/posts", { params })
    return response.data
  },

  // 게시물 검색
  getSearchPosts: async (params: { q: string }) => {
    const response = await apiClient.get<PostsResponse>("/posts/search", { params })
    return response.data
  },

  // 전체 태그 가져오기
  getTags: async () => {
    const response = await apiClient.get<Tag[]>("/posts/tags")
    return response.data
  },

  // 태그별 게시물 가져오기
  getPostsByTag: async (tag: string) => {
    const response = await apiClient.get<PostsResponse>(`/posts/tag/${tag}`)
    return response.data
  },

  /* --------------------------------
   * POST Requests
   * -------------------------------- */

  // 게시물 추가
  postAddPost: async (data: CreatePost) => {
    const response = await apiClient.post<Post>("/posts/add", data)
    return response.data
  },

  /* --------------------------------
   * PUT Requests
   * -------------------------------- */

  // 게시물 업데이트
  putUpdatePost: async (id: number, data: Post) => {
    const response = await apiClient.put<Post>(`/posts/${id}`, data)
    return response.data
  },

  /* --------------------------------
   * DELETE Requests
   * -------------------------------- */
  
  deletePost: async (id: number) => {
    const response = await apiClient.delete(`/posts/${id}`)
    return response.data
  },
}
