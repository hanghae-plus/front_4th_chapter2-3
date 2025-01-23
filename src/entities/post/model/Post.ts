import { ResponseWithData } from '../../search/model';
import { User } from '../../user/model';

export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;

  tags?: string[];
  reactions?: {
    likes: number;
    dislikes: number;
  };
  views?: number;
  author?: User;
}

export type Posts = ResponseWithData<Post, 'posts'>;
