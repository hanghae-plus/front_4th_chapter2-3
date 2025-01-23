import { getPosts, getPostsByTag } from '@/entities/post';
import { queryOptions } from '@tanstack/react-query';

export const postsQueries = {
  posts: (skip: number, limit: number) =>
    queryOptions({
      queryKey: ['posts'],
      queryFn: () => getPosts(skip, limit),
    }),
  postsByTag: (tag: string) =>
    queryOptions({
      queryKey: ['posts'],
      queryFn: () => getPostsByTag(tag),
    }),
  postsByQuery: (query: string) =>
    queryOptions({
      queryKey: ['posts'],
      queryFn: () => getPostsByTag(query),
    }),
};
