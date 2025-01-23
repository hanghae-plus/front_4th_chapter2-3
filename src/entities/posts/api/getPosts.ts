import { AxiosResponse } from "axios";

import { instance } from "@/shared/api";
import { ListResponse } from "@/shared/model";

import { Post } from "../model";

export interface GetPostsProps {
  limit?: number;
  skip?: number;
  sortBy?: string;
  order?: string;
}

export const getPosts = async ({ limit = 10, skip = 0, sortBy = "id", order = "asc" }: GetPostsProps) => {
  const response: AxiosResponse<ListResponse<{ posts: Post[] }>> = await instance.get("/api/posts", {
    params: {
      limit,
      skip,
      sortBy,
      order,
    },
  });

  return response.data;
};
