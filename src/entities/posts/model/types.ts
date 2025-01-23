interface Post {
  id?: number
  title?: string
  body?: string
  userId?: number
  tags?: string[]
  reactions?: Reactions
  author?: Author
}

interface Author {
  id: number
  username: string
  image: string
}

interface Reactions {
  likes: number
  dislikes: number
}

export type { Author, Post, Reactions }
