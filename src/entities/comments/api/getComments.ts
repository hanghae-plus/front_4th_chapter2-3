import { ListResponse } from "@/shared/model";

import { Comment } from "../model";

export const getComments = async (postId: Comment["postId"]) => {
  const response = await fetch(`/api/comments/post/${postId}`);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = (await response.json()) as ListResponse<{ comments: Comment[] }>;

  return data;
};
