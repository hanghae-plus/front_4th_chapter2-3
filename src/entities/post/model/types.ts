import type { User } from 'src/entities/user';

export interface Reactions {
  likes: number;
  dislikes: number;
}

export interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
  reactions?: Reactions;
  tags: string[];
  author?: User;
}
