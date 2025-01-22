import { api } from "../../../shared/api/api";
import { Comment } from "../model/types";

export const fetchComments = async (postId: number) => {
  const response = await api.get(`/api/comments/post/${postId}`);
  return response.data;
};

export const addComments = async (comment: Comment) => {
  const response = await api.post("/api/comments/add", comment);
  return response.data;
};

export const updateComments = async (
  commentId: number | undefined,
  updatedComment: { body: string }
) => {
  const response = await api.put(`/api/comments/${commentId}`, updatedComment);
  return response.data;
};

export const deleteComments = async (id: number) => {
  const response = await api.delete(`/api/comments/${id}`);
  return response.data;
};

export const likeComments = async (
  id: number,
  likesComment: { likes: number }
) => {
  const response = await api.patch(`/api/comments/${id}`, likesComment);
  return response.data;
};
