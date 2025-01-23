import { getTags } from '@/entities/tag';

export const tagQueries = {
  tags: () => ({
    queryKey: ['tags'],
    queryFn: getTags,
  }),
};
