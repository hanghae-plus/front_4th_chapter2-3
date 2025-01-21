import { InfUser } from "../../posts/types/types.ts"

export interface InfComment {
  body : string;
  id : number;
  likes : number;
  postId : number;
  user : InfUser;
}

export interface InfComments {
  limit : number;
  skip : number;
  total : number;
  comments : InfComment;
}