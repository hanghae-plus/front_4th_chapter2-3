import { instance } from "@/shared/api";

import { Post } from "../model";

export const updatePost = async (post: Post) => {
  const response = await instance.put(`/api/posts/${post.id}`, post);

  return response.data;
};
