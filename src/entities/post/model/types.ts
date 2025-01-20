import { User } from "../../user/model/types"

export interface PostsResponse {
  posts: Post[]
  limit: number
  skip: number
  total: number
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
  userId: number
  views: number
  author: Partial<User>
}

export interface Tag {
  name: string
  slug: string
  url: string
}
