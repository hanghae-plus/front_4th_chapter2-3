import { get } from '@/shared/api/fetch';
import { useQuery } from '@tanstack/react-query';

import { tagsQueryKeys } from '../config/tagsQueryKeys';
import type { Tags } from '../model/Tags';

export const useTagsQuery = () =>
  useQuery<Tags>({
    queryKey: tagsQueryKeys.list.queryKey,
    queryFn: () => get('/api/posts/tags'),
  });
