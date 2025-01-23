import { useQuery } from '@tanstack/react-query';
import { TagType } from '../../../entities/tag/model/types';
import { PostListDataType } from '../../../entities/post/model/types';

// 전체 태그 목록 조회
export const useTagList = () =>
  useQuery({
    queryKey: ['tags'],
    queryFn: async () => {
      const response = await fetch('/api/postList/tags');
      const data = await response.json();
      return data as TagType[];
    },
  });

// 태그별 게시물 조회
export const usePostsByTag = (tag: string) =>
  useQuery({
    queryKey: ['posts', 'tag', tag],
    queryFn: async () => {
      const [postListResponse, usersResponse] = await Promise.all([
        fetch(`/api/postList/tag/${tag}`),
        fetch('/api/users?limit=0&select=username,image'),
      ]);

      const postListData = (await postListResponse.json()) as PostListDataType;
      const usersData = await usersResponse.json();

      return {
        postList: postListData.postList.map((post) => ({
          ...post,
          author: usersData.users.find((user: { id: number }) => user.id === post.userId),
        })),
        total: postListData.total,
      };
    },
    enabled: !!tag && tag !== 'all',
  });
