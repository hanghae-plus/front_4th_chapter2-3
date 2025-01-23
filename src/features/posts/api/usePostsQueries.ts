import { useQuery } from '@tanstack/react-query';

import type { PostsResponse } from '@/entities/posts/api/PostsResponse';
import type { Post } from '@/entities/posts/model';

import { postsQueryKeys } from '../config/postsQueryKeys';

export const useQueryPosts = (limit: number, skip: number) =>
  useQuery<
    PostsResponse,
    Error,
    PostsResponse,
    readonly ['posts', 'list', { params: { limit: number; skip: number } }]
  >({
    ...postsQueryKeys.list({ limit, skip }),
    placeholderData: (previousData) => previousData,
  });

export const useQueryPostBy = (id: number) =>
  useQuery<Post, Error, Post, readonly ['posts', 'detail', number]>({
    ...postsQueryKeys.detail(id),
    enabled: Boolean(id),
  });
