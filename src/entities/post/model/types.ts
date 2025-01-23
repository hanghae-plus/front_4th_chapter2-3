import { UserInfoType } from "../../user/model/types";

export interface PostItem {
  id: number;
  title: string;
  body: string;
  tags: string[];
  reactions: {
    likes: number;
    dislikes: number;
  };
  views: number;
  userId: number;
  author: UserInfoType;
}

export interface Post {
  posts: PostItem[];
  total: number;
  skip: number;
  limit: number;
}