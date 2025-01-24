import { request } from "../../../shared";
import { Comment } from "../model/types";

export const createComment = async ({ newComment }: { newComment: Comment }) => {
  return request.post<Comment>(`/api/comments/add`, {
    json: newComment,
  });
};
