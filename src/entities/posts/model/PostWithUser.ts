import type { Post } from '@/entities/posts/model';
import type { UserResponse } from '@/entities/users/api/UserResponse';

export interface PostWithUser extends Post {
  author: UserResponse;
}
