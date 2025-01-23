import { User } from "../../../pages/postManagerPage.types"

export type Reactions = {
  likes: number
  dislikes: number
}

export interface Post {
  id: number
  title: string
  body: string
  tags: string[]
  reactions: Reactions
  views: number
  userId: number
  author?: User
}

export interface PostResponse {
  posts: Post[]
  total: number
  skip: number
  limit: number
}
