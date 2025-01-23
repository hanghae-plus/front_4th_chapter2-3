import { useMutation, useQueryClient } from '@tanstack/react-query';

import { postsApi } from '@/entities/posts/api';
import type { Post, PostWithUser } from '@/entities/posts/model';

import { postsQueryKeys } from '../config/postsQueryKeys';
import { useUrlParams } from '../lib';

export const useCreatePost = () => {
  const queryClient = useQueryClient();
  // eslint-disable-next-line sonarjs/no-unused-vars, @typescript-eslint/no-unused-vars
  const { updateParams: _, ...params } = useUrlParams();

  return useMutation({
    mutationFn: (data: Pick<Post, 'title' | 'body' | 'userId'>) => postsApi.createPost(data),
    onSuccess: (newPost) => {
      // 게시물 리스트 쿼리 데이터에 새 게시물 추가
      queryClient.setQueryData<PostWithUser[]>(
        postsQueryKeys.listWithUsers(params).queryKey,
        (oldData) =>
          oldData
            ? [{ ...newPost, userId: newPost.userId, reactions: { likes: 0 } }, ...oldData]
            : [{ ...newPost, userId: newPost.userId, reactions: { likes: 0 } }],
      );
    },
    onError: (error) => {
      console.error('게시물 생성 오류:', error);
    },
  });
};

export const useUpdatePost = () => {
  const queryClient = useQueryClient();
  // eslint-disable-next-line sonarjs/no-unused-vars, @typescript-eslint/no-unused-vars
  const { updateParams: _, ...params } = useUrlParams();

  return useMutation({
    mutationFn: (post: Post) => postsApi.updatePost(post),
    onSuccess: (updatedPost) => {
      // 게시물 상세 정보 쿼리 데이터 업데이트
      queryClient.setQueryData<Post>(postsQueryKeys.detail(updatedPost.id).queryKey, updatedPost);

      // 게시물 리스트 쿼리 데이터 업데이트
      queryClient.setQueryData<PostWithUser[]>(
        postsQueryKeys.listWithUsers(params).queryKey,
        (oldData) =>
          oldData
            ? oldData.map((post) =>
                post.id === updatedPost.id ? { ...post, ...updatedPost } : post,
              )
            : [],
      );

      // 실제 서버 데이터가 변경되지 않기에 queryKey 무효화 주석 => 로컬 캐싱 데이터 업데이트만 사용
      // queryClient.invalidateQueries({
      //   queryKey: postsQueryKeys.list._def,
      // });
    },
    onError: (error) => {
      console.error('게시물 업데이트 오류:', error);
    },
  });
};

export const useDeletePost = () => {
  const queryClient = useQueryClient();
  // eslint-disable-next-line sonarjs/no-unused-vars, @typescript-eslint/no-unused-vars
  const { updateParams: _, ...params } = useUrlParams();

  return useMutation({
    mutationFn: (id: number) => postsApi.deletePost(id),
    onSuccess: (_, deletedId) => {
      queryClient.setQueryData<PostWithUser[]>(
        postsQueryKeys.listWithUsers(params).queryKey,
        (oldData) => oldData?.filter((post) => post.id !== deletedId) ?? [],
      );
    },
    onError: (error) => {
      console.error('게시물 삭제 오류:', error);
    },
  });
};
