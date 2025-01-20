import { Post } from "../model";

export const getPosts = async (limit: number, skip: number) => {
  const response = await fetch(`/api/posts?limit=${limit}&skip=${skip}`);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = (await response.json()) as { posts: Post[] };

  return data;
};
