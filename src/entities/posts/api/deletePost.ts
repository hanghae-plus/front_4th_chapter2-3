import { instance } from "@/shared/api";

import { Post } from "../model";

export const deletePost = async (postId: Post["id"]) => {
  const response = await instance.delete(`/api/posts/${postId}`);
  return response.data;
};
