import { ListResponse } from "@/shared/model";

import { Post } from "../model";
import { GetPostsProps } from "./getPosts";

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
  const response = await fetch(
    `/api/posts/search?q=${searchQuery}&limit=${limit}&skip=${skip}&sortBy=${sortBy}&order=${order}`,
  );

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = (await response.json()) as ListResponse<{ posts: Post[] }>;

  return data;
};
