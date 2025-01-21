export interface Comment {
  id?: number;
  body: string;
  postId: number | null;
  userId: number;
  likes?: number;
  user?: {
    username: string;
  };
}
