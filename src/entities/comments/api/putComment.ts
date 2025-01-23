import { Comment } from '@/entities/comments';

export const putComment = async (comment: Comment): Promise<Comment> => {
  const response = await fetch(`/api/comments/${comment.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ body: comment.body }),
  });

  if (!response.ok) {
    throw new Error(`댓글 업데이트 오류: ${response.statusText}`);
  }

  return await response.json();
};
