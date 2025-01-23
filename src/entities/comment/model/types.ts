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

export interface CommentsResponse {
  comments: Comment[]
  total: number
}

export interface AddCommentRequest {
  body: string
  postId: number
  userId: number
}

export interface AddCommentResponse {
  body: string
  postId: number
  userId: number
}
