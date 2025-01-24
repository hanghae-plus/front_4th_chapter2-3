import { AxiosResponse } from "axios";

import { instance } from "@/shared/api";
import { ListResponse } from "@/shared/model";

import { Post } from "../model";
import { GetPostsProps } from "./getPosts";

export interface GetPostsByTagProps extends GetPostsProps {
  tag: string;
}

export const getPostsByTag = async ({
  tag,
  limit = 10,
  skip = 0,
  sortBy = "id",
  order = "asc",
}: GetPostsByTagProps) => {
  const response: AxiosResponse<ListResponse<{ posts: Post[] }>> = await instance.get(`/api/posts/tag/${tag}`, {
    params: { limit, skip, sortBy, order },
  });

  return response.data;
};
