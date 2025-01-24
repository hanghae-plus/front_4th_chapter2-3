export interface NewPost {
  title: string;
  body: string;
  userId: number;
}
export const initNewPost: NewPost = { title: '', body: '', userId: 1 };
export interface NewComment {
  body: string;
  postId: number | null;
  userId: number;
}
export const initNewComment: NewComment = { body: '', postId: null, userId: 1 };
