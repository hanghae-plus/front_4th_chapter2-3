import { Comment, NewComment } from '@/entities/comments';

export const postComment = async (newComment: NewComment): Promise<Comment> => {
  const response = await fetch('/api/comments/add', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newComment),
  });

  if (!response.ok) {
    throw new Error(`댓글 추가 오류: ${response.statusText}`);
  }

  return await response.json();
};
