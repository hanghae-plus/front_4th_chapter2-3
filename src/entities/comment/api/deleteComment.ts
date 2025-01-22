import { request } from "../../../shared/lib/request";

export const deleteComment = async ({ commentId }: { commentId: number }) => {
  return request.delete(`/api/comments/${commentId}`);
};
