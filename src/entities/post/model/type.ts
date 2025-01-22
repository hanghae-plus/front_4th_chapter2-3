export interface Post {
  id: string
  title: string
  tag?: string[]
  author?: {
    image?: string
    username?: string
  }
  reactions?: {
    likes?: number
    dislikes?: number
  }
}

export interface newPost {
  title: string
  body: string
  userId: number
}
