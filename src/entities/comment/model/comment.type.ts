export interface CommentType {
  id: number
  body: string
  likes: number
  postId: number
  user: {
    id: number
    fullName: string
    username: string
  }
}

export interface CommentsResponse {
  comments: CommentType[]
  limit: number
  skip: number
  total: number
}
