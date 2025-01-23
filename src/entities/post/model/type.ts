export interface Post {
  id: number
  title: string
  body: string
  tag?: string[]
  author?: {
    image: string
    username: string
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
