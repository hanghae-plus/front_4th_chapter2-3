import { Post } from "../model";

export const getPostsByTag = async (tag: string) => {
  const response = await fetch(`/api/posts/tag/${tag}`);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = (await response.json()) as { posts: Post[] };

  return data;
};
