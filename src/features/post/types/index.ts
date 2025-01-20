export interface Post {
  id: number
  author: Author
  body: string
  reactions: Reactions
  tags: string[]
  title: string
  userId: number
  views: number
}

interface Author {
  id: number
  image: string
  username: string
}

interface Reactions {
  likes: number
  dislikes: number
}

export interface Tags {
  name: string
  slug: string
  url: string
}
