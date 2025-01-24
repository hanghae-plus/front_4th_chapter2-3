import { useQuery } from '@tanstack/react-query';

import type { Tag } from '@/entities/tags/model';
import { get } from '@/shared/api/fetch';

import { tagsQueryKeys } from '../config/tagsQueryKeys';

export const useTagsQuery = () =>
  useQuery<Tag[]>({
    queryKey: tagsQueryKeys.list.queryKey,
    queryFn: () => get('/api/posts/tags'),
  });
