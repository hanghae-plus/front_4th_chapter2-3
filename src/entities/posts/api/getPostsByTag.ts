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
  const response = await fetch(`/api/posts/tag/${tag}?limit=${limit}&skip=${skip}&sortBy=${sortBy}&order=${order}`);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = (await response.json()) as ListResponse<{ posts: Post[] }>;

  return data;
};
