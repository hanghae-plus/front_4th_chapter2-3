import { Comment } from '../../../types.ts';

export const patchComment = async (
  commentId: number,
  body: Partial<Pick<Comment, 'likes' | 'body'>>,
): Promise<Comment> => {
  const response = await fetch(`/api/comments/${commentId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...body }),
  });

  if (!response.ok) {
    throw new Error(`댓글 좋아요 오류: ${response.statusText}`);
  }

  return await response.json();
};
