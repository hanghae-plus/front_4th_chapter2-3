import { Post } from "../../../entities/post/model/types"
import { User } from "../../../entities/user/api/userApi"

export interface PostWithUser extends Post {
  author: User
}
