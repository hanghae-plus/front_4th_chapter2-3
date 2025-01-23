import type { User } from '@/entities/user';

export interface Comment {
  id: number;
  postId: number;
  userId: number;
  body: string;
  likes: number;
  user: Pick<User, 'username'>;
}
