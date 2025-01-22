import { Post } from "@/types/post";

export const filterPostsByTag = (posts: Post[], tag: string): Post[] => {
  return posts.filter((post) => post.tags.some((postTag) => postTag === tag));
};
