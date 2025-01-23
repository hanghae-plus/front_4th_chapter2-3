import type { PostsRequestParams, PostsResponse } from '../model/types';

export const fetchPosts = async (params: PostsRequestParams): Promise<PostsResponse> => {
  const query = new URLSearchParams({
    skip: params.skip.toString(),
    limit: params.limit.toString(),
    ...(params.search && { search: params.search }),
    ...(params.sortBy && { sortBy: params.sortBy }),
    ...(params.sortOrder && { sortOrder: params.sortOrder }),
    ...(params.tag && { tag: params.tag }),
  });

  const response = await fetch(`/api/posts?${query.toString()}`);

  if (!response.ok) {
    throw new Error('Failed to fetch posts');
  }

  const data = await response.json();
  return data as PostsResponse;
};
