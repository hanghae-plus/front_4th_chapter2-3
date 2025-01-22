import { User } from "../../user/model/types"

interface Reactions {
  likes: number
  dislikes: number
}

export interface Post {
  id: number
  title: string
  body: string
  userId: number
  tags?: string[]
  reactions?: Reactions
  author: User
}

export interface Tag {
  url: string
  slug: string
}

export type NewPost = Pick<Post, "body" | "title" | "userId">
