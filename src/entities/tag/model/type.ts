import { Post } from "../../post/model/type"

export interface getTagsResponse {
  name: string
  slug: string
  url: string
}

export interface getPostByTagsRequest {
  limit: number
  skip: number
  total: number
  posts: Post[]
}
