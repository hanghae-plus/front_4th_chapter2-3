import { Comment } from '../../../shared/types';

export const addComment = async (newComment: { body: string; postId: number; userId: number }) => {
  const response = await fetch('/api/comments/add', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newComment),
  });
  return response.json();
};

export const updateComment = async (id: number, body: string) => {
  const response = await fetch(`/api/comments/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ body }),
  });
  return response.json();
};

export const deleteComment = async (id: number) => {
  await fetch(`/api/comments/${id}`, {
    method: 'DELETE',
  });
};

export const likeComment = async (id: number, likes: number) => {
  const response = await fetch(`/api/comments/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ likes: likes + 1 }),
  });
  return response.json();
};

export const getComments = async (postId: number): Promise<Comment[]> => {
  const response = await fetch(`/api/comments/post/${postId}`);
  const data = await response.json();
  return data.comments;
};
