import { Comment } from "../../entities/comment/model/types";

export interface CommentResponse {
  comments: Comment[];
  total: number;
  skip: number;
  limit: number;
}
