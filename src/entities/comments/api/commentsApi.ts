import { get, patch, post, put, remove } from '@/shared/api/fetch';
import type { Comment } from '../model';

const fetchComments = async (postId: number): Promise<Comment[]> => {
  const url = `/api/comments/post/${postId}`;
  return get(url);
};

const createComment = async (data: Comment): Promise<Comment> => {
  const url = '/api/comments/add';
  return post(url, data);
};

const updateComment = async (comment: Partial<Comment>): Promise<Comment> => {
  const url = `/api/comments/${comment.id}`;
  return put(url, { body: comment.body });
};

const deleteComment = async (id: number): Promise<void> => {
  const url = `/api/comments/${id}`;
  return remove(url);
};

const likeComment = async (
  id: number,
  value: number,
  type: 'likes' | 'dislikes' = 'likes',
): Promise<Comment> => {
  const url = `/api/comments/${id}`;
  return patch(url, { [type]: (value || 0) + 1 });
};

export const commentsApi = new (class {
  fetchComments = fetchComments;
  createComment = createComment;
  updateComment = updateComment;
  deleteComment = deleteComment;
  likeComment = likeComment;
})();
