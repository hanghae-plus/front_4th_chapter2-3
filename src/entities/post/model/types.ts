export type SortOrder = "asc" | "desc"

export interface PostsResponse {
  posts: Post[]
  total: number
  skip: number
  limit: number
}

export interface FetchPostsParams {
  limit?: number
  skip?: number
  sortBy?: string
  sortOrder?: SortOrder
  search?: string
}

export interface FetchPostsByTagParams extends FetchPostsParams {
  tag: string
}

export interface Reactions {
  likes: number
  dislikes: number
}

export interface Tag {
  slug: string
  name: string
  url: string
}

export interface Post {
  id: number
  title: string
  body: string
  tags: string[]
  reactions: Reactions
  views: number
  userId: number
}
