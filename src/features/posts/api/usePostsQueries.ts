import { useQuery } from '@tanstack/react-query';

import type { Post } from '@/entities/posts/model';

import { postsQueryKeys } from '../config/postsQueryKeys';
import type { Posts } from '../model';

export const usePostsList = (limit: number, skip: number) =>
  useQuery<
    Posts,
    Error,
    Posts,
    readonly ['posts', 'list', { params: { limit: number; skip: number } }]
  >({
    ...postsQueryKeys.list({ limit, skip }),
    placeholderData: (previousData) => previousData,
  });

export const usePost = (id: number) =>
  useQuery<Post, Error, Post, readonly ['posts', 'detail', number]>({
    ...postsQueryKeys.detail(id),
    enabled: Boolean(id),
  });
