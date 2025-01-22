import { Post } from "../model/types";

export interface PostResponse {
  posts: Post[];
  total: number;
  skip: number;
  limit: number;
}
