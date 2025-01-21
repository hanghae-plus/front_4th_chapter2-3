import { User } from "./user.ts";
import { PaginationMeta } from "./meta.ts";

export interface Post {
  id: number;
  title: string;
  body: string;
  tags: string[];
  reactions: Reaction;
  views: number;
  userId: number;
  comments: Comment[];
  author?: User;
}

interface Reaction {
  likes: number;
  dislikes: number;
}

export type NewPost = Pick<Post, "title" | "body" | "userId">;

export interface PostResponse extends PaginationMeta {
  posts: Post[];
}
