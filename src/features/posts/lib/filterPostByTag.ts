import { Post } from "@/types/post.ts";

export const filterPostByTag = (posts: Post[], tag: string): Post[] => {
  return posts.filter((post) => post.tags.some((postTag) => postTag === tag));
};
