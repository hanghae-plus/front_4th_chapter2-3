import { AxiosResponse } from "axios";

import { instance } from "@/shared/api";
import { ListResponse } from "@/shared/model";

import { Comment } from "../model";

export const getComments = async (postId: Comment["postId"]) => {
  const response: AxiosResponse<ListResponse<{ comments: Comment[] }>> = await instance.get(
    `/api/comments/post/${postId}`,
  );

  return response.data;
};
