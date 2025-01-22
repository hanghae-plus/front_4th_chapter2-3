import { Comment } from "../../../entities/comment/model/types";
import { request } from "../../../shared/lib/request";

export const likeComment = async ({ commentId, likes }: { commentId: number; likes: number }) => {
  return request.patch<Comment>(`/api/comments/${commentId}`, {
    json: { likes },
  });
};
