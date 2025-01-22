import { request } from "../../../shared/lib/request";
import { CommentResponse } from "../types";

export const fetchCommentsByPostId = async ({ postId }: { postId: number }) => {
  return request.get<CommentResponse>(`/api/comments/post/${postId}`);
};
