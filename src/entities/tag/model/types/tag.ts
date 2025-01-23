import type { Post } from "../../../post/model/types/post"

export interface Tag {
  slug: string
  name: string
  url: string
}

export interface TagWithPost {
  posts: Post[]
  total: number
  skip: number
  limit: number
}
