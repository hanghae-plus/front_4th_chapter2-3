import { Post, PostWithUser } from "@entities/post";
import { User } from "@entities/user";

export const getPostWithUser = (post: Post, users: User[]): PostWithUser => {
  return { ...post, author: users.find((user) => user.id === post.userId) ?? null };
};
