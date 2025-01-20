import { Post } from "../model";

export const getPostsByQuery = async (searchQuery: string) => {
  const response = await fetch(`/api/posts/search?q=${searchQuery}`);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = (await response.json()) as { posts: Post[] };

  return data;
};
