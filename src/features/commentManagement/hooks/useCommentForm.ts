import { useState, useCallback } from 'react';
import { CommentFormState } from '../../../entities/types';
import { useCommentActions } from '../../../entities/post/model/useCommentActions';

export const useCommentForm = (postId: number, initialData?: Partial<CommentFormState>) => {
  const [formData, setFormData] = useState<CommentFormState>({
    body: initialData?.body ?? '',
    postId,
    userId: initialData?.userId ?? 1,
  });

  const { fetchComments } = useCommentActions();

  const handleSubmit = useCallback(async (id?: number) => {
    try {
      if (id) {
        // 수정
        await fetch(`/api/comments/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ body: formData.body }),
        });
      } else {
        // 생성
        await fetch('/api/comments/add', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
      }

      // 성공 시 댓글 목록 새로고침
      await fetchComments(postId);
      
    } catch (error) {
      console.error('Failed to save comment:', error);
      throw error;
    }
  }, [formData, postId, fetchComments]);

  return {
    formData,
    setFormData,
    handleSubmit,
  };
};