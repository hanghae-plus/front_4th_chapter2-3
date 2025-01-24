import { Comment } from "../../../entities/comment/model/types";
import { request } from "../../../shared";

export const likeComment = async ({ commentId, likes }: { commentId: number; likes: number }) => {
  return request.patch<Comment>(`/api/comments/${commentId}`, {
    json: { likes },
  });
};
