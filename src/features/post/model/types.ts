import { Post, User } from "@entities/index";

export interface PostWithAuther extends Post {
  author: User;
}
