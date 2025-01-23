import { IPost } from "../../../entities/post/api";
import { IUser } from "../../../entities/user/api";

export interface IPostWithAuthor extends IPost {
  author: Pick<IUser, "username" | "image"> | null;
}
