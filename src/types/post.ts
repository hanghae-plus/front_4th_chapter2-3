import { User } from "./user.ts";

export interface Post {
  id: number;
  title: string;
  body: string;
  tags: string[];
  reactions: Reaction;
  views: number;
  userId: number;
  comments: Comment[];
  author: User;
}

interface Reaction {
  likes: number;
  dislikes: number;
}
