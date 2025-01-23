import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  fetchPosts,
  fetchPostsByTag,
  fetchTags,
  searchPosts,
  addPost,
  updatePost,
} from '../api/posts';
import { Post, User } from '../../../shared/types';

export interface PostWithAuthor extends Post {
  author: User | undefined;
}

export const usePostsQuery = (limit: number, skip: number) => {
  return useQuery({
    queryKey: ['posts', { limit, skip }],
    queryFn: () => fetchPosts(limit, skip),
  });
};

export const useTagsQuery = () => {
  return useQuery({
    queryKey: ['tags'],
    queryFn: fetchTags,
  });
};

export const usePostsByTagQuery = (tag: string) => {
  return useQuery({
    queryKey: ['posts', 'tag', tag],
    queryFn: () => fetchPostsByTag(tag),
    enabled: !!tag && tag !== 'all',
  });
};

export const useSearchPostsQuery = (query: string) => {
  return useQuery({
    queryKey: ['posts', 'search', query],
    queryFn: () => searchPosts(query),
    enabled: !!query,
  });
};

export const useAddPostMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
};

export const useUpdatePostMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updatePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
};
