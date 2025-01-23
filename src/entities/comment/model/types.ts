export interface CommentResponse {
  comments: Comment[]
  limit: number
  skip: number
  total: number
}

export interface Comment {
  id: number
  postId: number
  body: string
  likes: number
  user: {
    id: number
    fullName: string
    username: string
  }
}

export type NewComment = {
  body: string
  postId: number | null
  userId: number
}
