import { PartialUser } from "./user"

export interface Posts {
  posts: PostWithUser[]
  total: number
  skip: 0 | 1
  limit: number
}

export interface Post {
  id: number
  title: string
  body: string
  tags: string[]
  reactions: {
    likes: number
    dislikes: number
  }
  views: number
  userId: number
}

export interface PostWithUser extends Post {
  author: PartialUser
}

export interface NewPost {
  title: string
  body: string
  userId: number
}
