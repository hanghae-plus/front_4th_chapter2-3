import { getTags } from '@/entities/tag';
const QUERY_KEY = 'tags';
export const tagQueries = {
  tags: () => ({
    queryKey: [QUERY_KEY],
    queryFn: getTags,
  }),
};
