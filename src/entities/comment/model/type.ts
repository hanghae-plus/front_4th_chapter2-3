export interface Comments {
  comments: Comment[]
  total: number
  skip: 0 | 1
  limit: number
}

export interface Comment {
  id: number
  body: string
  postId: number
  likes: number
  user: {
    id: number
    username: string
    fullName: string
  }
}

export interface NewComment {
  body: string
  postId: number
  userId: number
}
