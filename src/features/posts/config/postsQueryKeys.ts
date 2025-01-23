import { createQueryKeys } from '@lukemorales/query-key-factory';

export const postsQueryKeys = createQueryKeys('posts', {
  list: (params: { limit: number; skip: number }) => ({
    queryKey: [{ params }],
  }),
  detail: (id: number) => ({
    queryKey: [id],
  }),
});
