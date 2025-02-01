import { httpClient } from "../../../shared/api"
import {
  FetchPostsParams,
  PostsResponse,
  Post,
  FetchPostsByTagParams,
  Tag,
  CreatePostDto,
  FetchPostsBySearchParams,
} from "../model"

export const postApi = {
  fetchPosts: async (params: Partial<FetchPostsParams>) => {
    const response = await httpClient.get<PostsResponse>("/posts", params)
    return response.data
  },

  fetchPost: async (id: string) => {
    const response = await httpClient.get<Post>(`/post/${id}`)
    return response.data
  },

  searchPosts: async (params: FetchPostsBySearchParams) => {
    const searchParams: Record<string, string | number> = {}

    if (params.search) searchParams.q = params.search
    if (params.limit) searchParams.limit = params.limit
    if (params.skip) searchParams.skip = params.skip
    if (params.sortBy) searchParams.sortBy = params.sortBy
    if (params.order) searchParams.order = params.order

    const response = await httpClient.get<PostsResponse>("/posts/search", searchParams)
    return response.data
  },

  fetchPostsByTag: async (params: FetchPostsByTagParams) => {
    const response = await httpClient.get<PostsResponse>(`/posts/tag/${params.tag}`, {
      limit: params.limit || 10,
      skip: params.skip || 0,
    })
    return response.data
  },

  addPost: async (post: CreatePostDto) => {
    const response = await httpClient.post<Post>("/posts/add", {
      ...post,
      tags: ["history"],
      reactions: { likes: 0, dislikes: 0 },
      view: 0,
    })
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
