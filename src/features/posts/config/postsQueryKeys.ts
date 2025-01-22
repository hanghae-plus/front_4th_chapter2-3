import { createQueryKeys } from '@lukemorales/query-key-factory';

import { postsApi } from '@/entities/posts/api';

export const postsQueryKeys = createQueryKeys('posts', {
  list: (params: { limit: number; skip: number }) => ({
    queryKey: [{ params }],
    queryFn: () => postsApi.fetchPosts(params.limit, params.skip),
  }),
  detail: (id: number) => ({
    queryKey: [id],
    queryFn: () => postsApi.fetchPostById(id),
  }),
});
