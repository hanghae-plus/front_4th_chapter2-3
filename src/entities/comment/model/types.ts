import { Post } from "../../post/model/types"
import { User } from "../../user/model/types"

interface Comment {
  id: number
  body: string
  likes: number
  postId: Post["id"]
  user: Pick<User, "id" | "username"> & { fullName: string }
}

interface NewComment {
  body: Comment["body"]
  postId: Comment["postId"] | null
  userId: Comment["user"]["id"]
}

type PostComments = Record<Post["id"], Comment[]>

export type { Comment, PostComments, NewComment }
