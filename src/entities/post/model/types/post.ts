import type { User } from "../../../user/model/types/user"

interface Reaction {
  likes: number
  dislikes: number
}

// ResponseType
export interface Post {
  id: number
  title: string
  body: string
  tags: string[]
  reactions: Reaction
  views: number
  userId: number
}

export interface PostWithUser extends Post {
  author: User
}
