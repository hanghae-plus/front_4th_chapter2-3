import { request } from "../../../shared";

export const deletePost = async ({ postId }: { postId: number }) => {
  return request.delete(`/api/posts/${postId}`);
};
