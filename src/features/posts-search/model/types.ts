import { Post } from "../../../entities/post/model/types"
import { User } from "../../../entities/user/model/types"

export interface PostWithAuthor extends Post {
  author?: User
}
