import { request } from "../../../shared/lib/request";
import { Comment } from "../model/types";

export const createComment = async ({ newComment }: { newComment: Comment }) => {
  return request.post<Comment>(`/api/comments/add`, {
    json: newComment,
  });
};
