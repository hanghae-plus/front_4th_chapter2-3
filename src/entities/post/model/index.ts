import { User } from '@entities/model'

export interface Post {
  id: number
  title: string
  body: string
  userId: number
  tags?: string[]
  author?: User
  reactions?: {
    likes: number
    dislikes: number
  }
}

export interface PostsResponse {
  posts: Post[]
  total: number
  skip: number
  limit: number
}