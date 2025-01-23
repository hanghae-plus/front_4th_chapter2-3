import { getTags } from '@/entities/tag';
import { queryOptions } from '@tanstack/react-query';
const QUERY_KEY = 'tags';
export const tagQueries = {
  tags: () =>
    queryOptions({
      queryKey: [QUERY_KEY],
      queryFn: getTags,
    }),
};
