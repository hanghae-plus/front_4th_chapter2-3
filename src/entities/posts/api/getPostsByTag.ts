import { ListResponse } from "@/shared/model";

import { Post } from "../model";

export interface GetPostsByTagProps {
  limit: number;
  skip: number;
  tag: string;
}

export const getPostsByTag = async ({ limit, skip, tag }: GetPostsByTagProps) => {
  const response = await fetch(`/api/posts/tag/${tag}?limit=${limit}&skip=${skip}`);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = (await response.json()) as ListResponse<{ posts: Post[] }>;

  return data;
};
