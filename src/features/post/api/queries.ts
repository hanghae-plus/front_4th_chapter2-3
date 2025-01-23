import { useQuery } from '@tanstack/react-query';
import { PostItemType } from '../../../entities/post/model/types';
import { UserType } from '../../../entities/user/model/types';

// 게시물 목록 조회 쿼리
export const usePostList = (limit: number, skip: number) =>
  useQuery({
    queryKey: ['posts', limit, skip],
    queryFn: async () => {
      const [postListResponse, usersResponse] = await Promise.all([
        fetch(`/api/postList?limit=${limit}&skip=${skip}`),
        fetch('/api/users?limit=0&select=username,image'),
      ]);

      const postListData = await postListResponse.json();
      const usersData = await usersResponse.json();

      return {
        postList: postListData.postList.map((post: PostItemType) => ({
          ...post,
          author: usersData.users.find((user: UserType) => user.id === post.userId),
        })),
        total: postListData.total,
      };
    },
  });

// 게시물 검색 쿼리
export const useSearchPosts = (searchQuery: string) =>
  useQuery({
    queryKey: ['posts', 'search', searchQuery],
    queryFn: async () => {
      const response = await fetch(`/api/postList/search?q=${searchQuery}`);
      return response.json();
    },
    enabled: !!searchQuery,
  });

// 태그별 게시물 조회 쿼리
export const usePostsByTag = (tag: string) =>
  useQuery({
    queryKey: ['posts', 'tag', tag],
    queryFn: async () => {
      const [postListResponse, usersResponse] = await Promise.all([
        fetch(`/api/postList/tag/${tag}`),
        fetch('/api/users?limit=0&select=username,image'),
      ]);

      const postListData = await postListResponse.json();
      const usersData = await usersResponse.json();

      return {
        postList: postListData.postList.map((post: PostItemType) => ({
          ...post,
          author: usersData.users.find((user: UserType) => user.id === post.userId),
        })),
        total: postListData.total,
      };
    },
    enabled: !!tag && tag !== 'all',
  });
