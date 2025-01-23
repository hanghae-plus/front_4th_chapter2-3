export interface Post extends NewPost {
  id: number
  author: Author
  reactions: Reactions
  tags: string[]
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

export interface NewPost {
  title: string
  body: string
  userId: number
}
