import { User } from "../../user/model/types"

export interface Post {
  id: number
  title: string
  body: string
  userId: number
  tags?: string[]
  reactions?: {
    likes: number
    dislikes: number
  }
  author?: Pick<User, "username" | "image">
}

export interface FetchPostsParams {
  limit: number
  skip: number
  tag?: string
  search?: string
}

export interface PostsResponse {
  posts: Post[]
  total: number
}
