import { User } from '@/entities/user/model/types';

export interface Comment {
  id: number;
  postId: number;
  userId: number;
  body: string;
  likes: number;
  user: Pick<User, 'username'>;
}
