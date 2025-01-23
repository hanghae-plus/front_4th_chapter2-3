import { ListResponse } from "@/shared/model";

import { Post } from "../model";

export interface GetPostsProps {
  limit?: number;
  skip?: number;
  sortBy?: string;
  order?: string;
}

export const getPosts = async ({ limit = 10, skip = 0, sortBy = "id", order = "asc" }: GetPostsProps) => {
  const response = await fetch(`/api/posts?limit=${limit}&skip=${skip}&sortBy=${sortBy}&order=${order}`);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = (await response.json()) as ListResponse<{ posts: Post[] }>;

  return data;
};
