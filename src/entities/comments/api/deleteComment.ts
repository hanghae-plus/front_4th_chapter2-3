import { instance } from "@/shared/api";

import { Comment } from "../model";

export const deleteComment = async (id: Comment["id"]) => {
  const response = await instance.delete(`/api/comments/${id}`);

  return response.data;
};
