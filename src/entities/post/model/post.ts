import { User } from '@/entities/user';
import { Reaction } from '@/entities/reaction';
import { ResponseWithData } from '@/shared/model';

export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
  tags?: string[];
  reactions?: Reaction;
  views?: number;
  author?: User;
}

export type Posts = ResponseWithData<Post, 'posts'>;
