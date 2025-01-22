export interface CommentType {
  id: number;
  body: string;
  postId?: number;
  likes: number;

  userId: number;
  user: {
    id: number;
    username: string;
  };
}
