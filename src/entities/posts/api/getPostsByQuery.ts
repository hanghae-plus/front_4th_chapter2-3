import { AxiosResponse } from "axios";

import { instance } from "@/shared/api";
import { ListResponse } from "@/shared/model";

import { GetPostsProps } from "./getPosts";
import { Post } from "../model";

export interface GetPostsByQueryProps extends GetPostsProps {
  searchQuery: string;
}

export const getPostsByQuery = async ({
  searchQuery,
  limit = 10,
  skip = 0,
  sortBy = "id",
  order = "asc",
}: GetPostsByQueryProps) => {
  const response: AxiosResponse<ListResponse<{ posts: Post[] }>> = await instance.get("/api/posts/search", {
    params: { q: searchQuery, limit, skip, sortBy, order },
  });

  return response.data;
};
