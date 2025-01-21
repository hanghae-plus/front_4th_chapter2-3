import { ResponseWithData } from '../../search/model';
import { UserThumbnail } from '../../user/model';

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
  author?: UserThumbnail;
}

export type Posts = ResponseWithData<Post, 'posts'>;
