import { useQuery, useQueryClient } from '@tanstack/react-query';
import { userQueries } from '@/entities/user/api/queries.ts';
import { findUserById } from '@/entities/user';
import { useQueryStore } from '@/features/post';
import { postsQueries } from '@/entities/post/api/queries.ts';
import { Posts } from '@/entities/post';

const useFetchPosts = () => {
  const queryClient = useQueryClient();
  const { skip, limit } = useQueryStore();

  const { data: userData, isLoading: userLoading } = useQuery({
    ...userQueries.users(),
    staleTime: 1000 * 60 * 10,
  });

  const { data: postsData, isLoading: postLoading } = useQuery({
    ...postsQueries.posts(skip, limit),
    select: (data) => ({
      ...data,
      skip: data.skip,
      limit: data.limit,
      posts: data.posts.map((post) => ({
        ...post,
        author: findUserById(userData?.users || [], post.userId),
      })),
      total: data.total,
    }),
    enabled: !!userData,
  });

  queryClient.setQueryData<Posts>(['posts'], (prev) => {
    if (!postsData) return prev;
    return {
      ...postsData,
      posts: postsData.posts.map((post) => ({
        ...post,
        author: findUserById(userData?.users || [], post.userId),
        total: postsData.total,
      })),
    };
  });

  return {
    isLoading: userLoading || postLoading,
  };
};

export default useFetchPosts;
