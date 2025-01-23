import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { fetchPosts } from '.';
import { useFilterStore, usePaginationStore } from '../model';
import type { PostsResponse, FilterState, PaginationState } from '../model';

export const usePostsQuery = (): UseQueryResult<PostsResponse, Error> => {
  const filters: FilterState = useFilterStore((state) => state);
  const pagination: PaginationState = usePaginationStore((state) => state);

  const requestParams = { ...filters, ...pagination };

  return useQuery<PostsResponse, Error, PostsResponse>({
    queryKey: ['posts', requestParams],
    queryFn: () => fetchPosts(requestParams),
    staleTime: 5 * 60 * 1000,
  });
};
