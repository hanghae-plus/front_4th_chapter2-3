import type { Post } from '@/entities/posts/model';
import type { User } from '@/entities/users/model';

export interface PostWithUser extends Post {
  author: User;
}
