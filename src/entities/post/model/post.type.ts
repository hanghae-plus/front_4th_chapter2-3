import type { UserType } from "@entities/user/model"

export interface PostType {
  id: number
  title: string
  body: string
  tags: string[]
  reactions: {
    likes: number
    dislikes: number
  }
  views: number
  userId: UserType["id"]
}

export interface PostsResponse {
  posts: PostType[] | undefined
  skip: number
  limit: number
  total: number
}
