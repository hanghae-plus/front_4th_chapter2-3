interface User {
  id: number
  username: string
  fullName: string
}

interface Comment {
  id: number
  body: string
  postId: number
  likes: number
  user: User
}

interface CommentResponse {
  comments: Comment[]
  total: number
  skip: number
  limit: number
}

interface CommentRequest {
  body: string
  postId: number
  userId: number
}

export type { Comment, CommentRequest, CommentResponse, User }
