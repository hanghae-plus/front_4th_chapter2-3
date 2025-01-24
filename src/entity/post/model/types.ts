export interface Post {
  id: number
  title: string
  body: string
  tags?: string[]
  reactions?: {
    likes: number
    dislikes: number
  }
  views?: number
  userId: number
  author?: {
    id: number
    username?: string
    image?: string
  }
}

export interface PostInfo {
  posts: Post[]
  total: number
  skip: number
  limit: number
}
