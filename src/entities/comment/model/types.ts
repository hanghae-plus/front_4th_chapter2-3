export interface CommentsResponseDto {
  comments: Comment[];
  total: number;
  skip: number;
  limit: number;
}

export interface Comment {
  id: number;
  body: string;
  postId: number;
  likes: number;
  user: {
    id: number;
    username: string;
    fullName: string;
  };
}

export interface NewComment {
  body: string;
  postId: number | null;
  userId: number;
}
