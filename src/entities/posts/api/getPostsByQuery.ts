import { Post } from "../model";

export interface GetPostsByQueryProps {
  searchQuery: string;
  limit: number;
  skip: number;
}

export const getPostsByQuery = async ({ searchQuery, limit = 10, skip = 10 }: GetPostsByQueryProps) => {
  const response = await fetch(`/api/posts/search?q=${searchQuery}&limit=${limit}&skip=${skip}`);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = (await response.json()) as { posts: Post[] };

  return data;
};
