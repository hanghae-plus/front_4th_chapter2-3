import { User } from "../../user/model/types";
import { Post } from "../model/types";

export function mergePostAndUsers(posts: Post[], users: User[]): Post[] {
  return posts.map((post) => ({
    ...post,
    author: users.find((user) => user.id === post.userId),
  }));
}
