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
  tag?: string
  search?: string
}

export interface Reactions {
  likes: number
  dislikes: number
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

export interface FetchPostsByTagParams {
  tag: string
  limit: number
  skip: number
}
