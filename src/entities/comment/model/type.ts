export interface Comment {
  postId: number | null
  id: number
  body: string
  user: {
    username: string
  }
  likes: number
  userId: number
}

export interface newComment {
  body: string
  postId: number | null
  userId: number
}
