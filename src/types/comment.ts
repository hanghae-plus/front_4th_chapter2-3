import { User } from "@/types/user.ts";

export interface Comment {
  id: number;
  body: string;
  postId: number;
  likes: number;
  user: Partial<User>;
}

export interface CommentResponse {
  comments: Comment[];
  total: number;
  skip: number;
  limit: number;
}

export interface CommentRequest {
  body: string;
  postId: number;
  userId: number;
}
