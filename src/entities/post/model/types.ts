export interface Author {
  id: number
  username: string
  image: string
}

export interface Reactions {
  likes: number
  dislikes: number
}

export interface Post {
  id: number
  title: string
  body: string
  author?: Author
  reactions?: Reactions
  createdAt?: string
  updatedAt?: string
}
