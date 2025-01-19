export type Post = {
  id: number
  title: string
  body: string
  userId: number
  tags?: string[]
  reactions?: {
    likes: number
    dislikes: number
  }
  views: number
  author?: User
}

export type User = {
  id: number
  username: string
  image: string
  firstName?: string
  lastName?: string
  age?: number
  email?: string
  phone?: string
  address?: {
    address: string
    city: string
    state: string
  }
  company?: {
    name: string
    title: string
  }
}

export type Comment = {
  id: number
  body: string
  postId: number | null
  userId: number
  likes: number
  user: {
    username: string
  }
}

export type NewComment = Pick<Comment, 'body' | 'postId' | 'userId'>

export type Tag = {
  slug: string
  name: string
  url: string
}
