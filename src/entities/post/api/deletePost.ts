import { request } from "../../../shared/lib/request";

export const deletePost = async ({ postId }: { postId: number }) => {
  return request.delete(`/api/posts/${postId}`);
};
