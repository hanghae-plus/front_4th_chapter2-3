export interface Comment {
  postId: string
  id: string
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
