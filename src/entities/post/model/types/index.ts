import { User } from "@entities/user/model"

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

export interface PostTag {
  url: string
  slug: string
}

export interface PostComment {
  body: string
  postId: number | null
  userId: number
}

export interface PostSort {
  field: string
  order: "asc" | "desc"
}

export interface PostFilter {
  tag?: string
  search?: string
  sort?: PostSort
  pagination: {
    skip: number
    limit: number
  }
}
