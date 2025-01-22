import { User } from "../../user/model/types";

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
	// author의 value 값이 User 타입으로 들어오게 설정해야하나..?
  author: User;
}

export interface Post {
  posts: PostItem[];
  total: number;
  skip: number;
  limit: number;
}