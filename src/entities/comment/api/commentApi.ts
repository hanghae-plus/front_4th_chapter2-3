import { baseApi } from "../../../shared/api/baseApi";
import { Comment } from "../../types";

interface CommentsResponse {
  comments: Comment[];
  total: number;
}

export const commentApi = {
  // 댓글 조회
  getCommentsByPostId: (postId: number) =>
    baseApi.get<CommentsResponse>(`/api/comments/post/${postId}`),

  getCommentById: (id: number) =>
    baseApi.get<Comment>(`/api/comments/${id}`),

  // 댓글 생성/수정/삭제
  createComment: (comment: Omit<Comment, "id" | "user">) =>
    baseApi.post<Comment>("/api/comments/add", comment),

  updateComment: (id: number, body: string) =>
    baseApi.put<Comment>(`/api/comments/${id}`, { body }),

  deleteComment: (id: number) =>
    baseApi.delete(`/api/comments/${id}`),

  // 댓글 좋아요
  updateLikes: (id: number, likes: number) =>
    baseApi.patch<Comment>(`/api/comments/${id}`, { likes }),
};