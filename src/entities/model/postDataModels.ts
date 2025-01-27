import { UserDetail } from "../user/model/userVo";

export interface Post {
  body: string;
  id: number;
  reactions: {
    dislikes: number;
    likes: number;
  };
  tags: string[];
  title: string;
  userId: number;
  views: number;
}

export interface PostCollection {
  posts: Post[];
  total: number;
  skip: number;
  limit: number;
}

type CommentUser = Pick<UserDetail, "id" | "username" | "fullName">;

export interface Comment {
  id: number;
  body: string;
  postId: number | null;
  likes?: number;
  user?: CommentUser;
  message?: string;
}

export interface Comments {
  // 아직 쓰는곳이없음
  postId: Comment[];
}
