import { ResponseWithData } from '../../search/model';

export interface Comment {
  id: number;
  body: string;
  postId: number;
  likes?: number;
  user: {
    id: number;
    username: string;
    fullName: string;
  };
}

export type Comments = ResponseWithData<Comment, 'comments'>;
