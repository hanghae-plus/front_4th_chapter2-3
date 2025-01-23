import type { ApiResponseWith } from '@/shared/api';

export interface Comment {
  id: number;
  body: string;
  postId: number | null;
  likes: number;
  user: {
    id: number;
    username: string;
    fullName: string;
  };
}

export type Comments = ApiResponseWith<Comment, 'comments'>;

export type Nullable<T> = {
  [P in keyof T]: T[P] | null;
};
