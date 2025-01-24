import { request } from "../../../shared";

export const deleteComment = async ({ commentId }: { commentId: number }) => {
  return request.delete(`/api/comments/${commentId}`);
};
