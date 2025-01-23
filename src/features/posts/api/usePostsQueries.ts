import { useQuery } from '@tanstack/react-query';

import { postsApi } from '@/entities/posts/api';
import type { PostsResponse } from '@/entities/posts/api/PostsResponse';
import type { Post } from '@/entities/posts/model';

import { postsQueryKeys } from '../config/postsQueryKeys';
import type { PostsUrlParams } from '../lib';

export const useQueryPosts = (params: PostsUrlParams) =>
  useQuery<PostsResponse>({
    queryKey: postsQueryKeys.list(params).queryKey,
    queryFn: () => {
      const searchParams = new URLSearchParams();
      for (const [key, value] of Object.entries(params)) {
        if (value) {
          searchParams.set(key, String(value));
        }
      }
      return postsApi.fetchPosts(searchParams.toString());
    },
    placeholderData: (previousData) => previousData,
  });

export const useQueryPostBy = (id: number) =>
  useQuery<Post>({
    queryKey: postsQueryKeys.detail(id).queryKey,
    queryFn: () => postsApi.fetchPostById(id),
    enabled: Boolean(id),
  });
