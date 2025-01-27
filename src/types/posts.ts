export interface Post {
  id: number
  title: string
  body: string
  userId: number
  tags?: string[]
  reactions?: {
    likes: number
    dislikes: number
  }
  author?: User
  comments?: Comment[]
}

export interface User {
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

export interface Comment {
  id: number
  body: string
  postId: number
  userId: number
  likes: number
  user: {
    username: string
  }
}

export interface Tag {
  id: string
  slug: string
}
