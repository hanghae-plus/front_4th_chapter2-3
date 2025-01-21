import { baseApi } from "../../../shared/api/baseApi";
import { Post, PostFilters, PaginationParams } from "../../../entities/types"

interface PostsResponse {
  posts: Post[];
  total: number;
}

interface TagsResponse {
  tags: Array<{
    slug: string;
    url: string;
  }>;
}

export const postApi = {
  // 게시물 조회
  getPosts: (params: PaginationParams & PostFilters) => 
    baseApi.get<PostsResponse>(
      `/api/posts?${new URLSearchParams({
        limit: params.limit.toString(),
        skip: params.skip.toString(),
        sortBy: params.sortBy,
        sortOrder: params.sortOrder,
      }).toString()}`
    ),

  getPostById: (id: number) =>
    baseApi.get<Post>(`/api/posts/${id}`),

  searchPosts: (query: string) =>
    baseApi.get<PostsResponse>(`/api/posts/search?q=${query}`),

  getPostsByTag: (tag: string) =>
    baseApi.get<PostsResponse>(`/api/posts/tag/${tag}`),

  getTags: () =>
    baseApi.get<TagsResponse>("/api/posts/tags"),

  // 게시물 생성/수정/삭제
  createPost: (post: Omit<Post, "id">) =>
    baseApi.post<Post>("/api/posts/add", post),

  updatePost: (id: number, post: Partial<Post>) =>
    baseApi.put<Post>(`/api/posts/${id}`, post),

  deletePost: (id: number) =>
    baseApi.delete(`/api/posts/${id}`),

  // 게시물 반응
  updateReactions: (id: number, reactions: Post["reactions"]) =>
    baseApi.patch<Post>(`/api/posts/${id}/reactions`, reactions),
};