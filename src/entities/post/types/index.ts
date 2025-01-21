export interface Reactions {
  likes: number
  dislikes: number
}

export interface Post {
  id: number
  title: string
  body: string
  tags: string[]
  userId: number
  views: number
  reactions: Reactions
}

export interface PostResponse {
  limit: number
  posts: Post[]
  skip: number
  total: number
}
