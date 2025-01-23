import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CommentDataType } from '../../../entities/comment/model/types';

/**
 * 댓글 추가 및 수정 기능을 제공하는 훅
 * @returns 댓글 추가 및 수정 기능을 제공하는 훅
 */
export const useCommentMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ comment, isEdit }: CommentDataType) => {
      const url = isEdit ? `/api/comments/${comment.id}` : '/api/comments';

      const response = await fetch(url, {
        method: isEdit ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(comment),
      });

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments'] });
    },
  });
};

/**
 * 댓글 삭제 기능을 제공하는 훅
 * @returns 댓글 삭제 기능을 제공하는 훅
 */
export const useDeleteComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (commentId: number) => {
      const response = await fetch(`/api/comments/${commentId}`, {
        method: 'DELETE',
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments'] });
    },
  });
};
