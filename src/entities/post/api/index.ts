import { httpClient } from "../../../shared/api/http-client"
import { FetchPostsParams, PostsResponse, Post, FetchPostsByTagParams, Tag } from "../model/types"

export const postApi = {
  fetchPosts: (params: Partial<FetchPostsParams>) => httpClient.get<PostsResponse>("/posts", params),

  searchPosts: (query: string) => httpClient.get<PostsResponse, { q: string }>("/posts/search", { q: query }),

  fetchPostsByTag: async (params: FetchPostsByTagParams) => {
    const response = await httpClient.get<PostsResponse>(`/posts/tag/${params.tag}`, {
      limit: params.limit,
      skip: params.skip,
    })
    return response.data
  },

  addPost: async (post: Omit<Post, "id">) => {
    const response = await httpClient.post<Post>("/posts/add", post)
    return response.data
  },

  updatePost: async (id: number, post: Partial<Post>) => {
    const response = await httpClient.put<Post>(`/posts/${id}`, post)
    return response.data
  },

  deletePost: async (id: number) => {
    const response = await httpClient.delete<void>(`/posts/${id}`)
    return response.data
  },

  fetchTags: async () => {
    const response = await httpClient.get<Tag[]>("/posts/tags")
    return response.data
  },
}
