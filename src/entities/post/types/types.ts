import { User } from "@entities/user/types"

export type SearchParams = {
  limit: string
  skip: string
  sortBy: string
  sortOrder: string
}

type Reactions = {
  likes: number
  dislikes: number
}

export type Post = {
  id: number
  title: string
  body: string
  tags: string[]
  reactions: Reactions
  views: number
  userId: number
}

export type PostWithUser = Post & {
  author: User
}

export type RequestPost = Partial<Post>

export type DeletedPost = Post & {
  isDeleted: boolean
  deletedOn: Date
}

export type PostResponse = {
  limit: number
  posts: Post[]
  skip: number
  total: number
}

export type Tag = {
  name: string
  slug: string
  url: string
}
