import { useMutation, useQueryClient } from '@tanstack/react-query';
import { PostItemType } from '../../../entities/post/model/types';

// 게시물 추가/수정 뮤테이션
export const usePostMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ post, isEdit }: { post: PostItemType; isEdit: boolean }) => {
      const url = isEdit ? `/api/postList/${post.id}` : '/api/postList/add';
      const method = isEdit ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(post),
      });

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
};

// 게시물 삭제 뮤테이션
export const useDeletePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      await fetch(`/api/postList/${id}`, {
        method: 'DELETE',
      });
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
};
