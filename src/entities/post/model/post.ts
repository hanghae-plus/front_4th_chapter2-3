import { ResponseWithData } from '../../search/model';
import { User } from '../../user/model';
import { Reaction } from '@/entities/reaction';

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
