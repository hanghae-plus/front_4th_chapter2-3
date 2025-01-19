import { User } from "@entities/user";

export interface PostsResponseDto {
  posts: Post[];
  total: number;
  skip: number;
  limit: number;
}

export interface Post {
  id: number;
  title: string;
  body: string;
  tags: string[];
  reactions: Reaction;
  views: number;
  userId: number;
}

export interface PostWithAuther extends Post {
  author: User | null;
}

export interface Reaction {
  likes: number;
  dislikes: number;
}
