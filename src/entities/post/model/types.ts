import { User } from "../../user/api/userApi"

export interface Post {
  id: number
  title: string
  body: string
  tags: string[]
  reactions: Reactions
  views: number
  userId: User["id"]
}

export interface Reactions {
  likes: number
  dislikes: number
}
