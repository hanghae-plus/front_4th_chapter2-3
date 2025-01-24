import { request } from "../../../shared";
import { Comment } from "../model/types";

export const updateComment = async ({ comment }: { comment: Comment }) => {
  return request.put<Comment>(`/api/comments/${comment.id}`, {
    json: { body: comment.body },
  });
};
