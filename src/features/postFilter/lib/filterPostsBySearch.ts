import { Post } from "@/types/post";

export const filterPostsBySearch = (posts: Post[], searchQuery: string): Post[] => {
  if (!searchQuery.trim()) return posts;

  return posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.body.toLowerCase().includes(searchQuery.toLowerCase()),
  );
};
