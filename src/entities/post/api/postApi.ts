import { apiClient } from '../../../shared/api';
import { Post, PostFilters, PaginationParams, PostFormState} from "../../../entities/types"

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
    apiClient.get<PostsResponse>(
      `/posts?${new URLSearchParams({
        limit: params.limit.toString(), 
        skip: params.skip.toString(),
        ...(params.sortBy && { sortBy: params.sortBy }),
        ...(params.sortOrder && { sortOrder: params.sortOrder }),
      }).toString()}`
    ),

  getPostById: (id: number): Promise<Post> =>
    apiClient.get<Post>(`/api/posts/${id}`),

  searchPosts: (query: string) =>
    apiClient.get<PostsResponse>(`/api/posts/search?q=${query}`),

  getPostsByTag: (tag: string) =>
    apiClient.get<PostsResponse>(`/api/posts/tag/${tag}`),

  getTags: () =>
    apiClient.get<TagsResponse>("/api/posts/tags"),

  getPostWithComments: (postId: number) =>
    apiClient.get<{ comments: Comment[] }>(`/api/posts/${postId}/comments`),

  // 게시물 생성/수정/삭제
  createPost: (post: PostFormState) =>
    apiClient.post<Post>('/api/posts/add', post),

  updatePost: (id: number, post: Partial<Post>) =>
    apiClient.put<Post>(`/api/posts/${id}`, post),

  deletePost: (id: number) =>
    apiClient.delete(`/api/posts/${id}`),

  // 게시물 반응
  updateReactions: (id: number, reactions: Post["reactions"]) =>
    apiClient.patch<Post>(`/api/posts/${id}/reactions`, reactions),
};