import { Post } from "./post"

export interface Response {
  limit: number
  skip: number
  total: number
  posts: Post[]
}
