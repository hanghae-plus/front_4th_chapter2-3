export interface Comment {
  postId: number
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
  postId: string
  userId: number
}
