import { User } from "../../user/types"

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
export interface Tag {
  slug: string
  name: string
  url: string
}

export type TagResponse = Tag[]
