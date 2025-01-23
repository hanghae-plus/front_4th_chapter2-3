import type { PostsRequestParams, PostsResponse } from '../model/types';

export const fetchPosts = async (params: PostsRequestParams): Promise<PostsResponse> => {
  // 1. URLSearchParams로 쿼리스트링 생성
  const query = new URLSearchParams({
    skip: params.skip.toString(),
    limit: params.limit.toString(),
    ...(params.search && { search: params.search }),
    ...(params.sortBy && { sortBy: params.sortBy }),
    ...(params.sortOrder && { sortOrder: params.sortOrder }),
    ...(params.tag && { tag: params.tag }),
  });

  // 2. API 호출
  const response = await fetch(`/api/posts?${query.toString()}`);

  // 3. 에러 처리
  if (!response.ok) {
    throw new Error('Failed to fetch posts');
  }

  // 4. 결과 반환
  return response.json();
};
