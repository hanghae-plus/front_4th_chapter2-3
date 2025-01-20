export interface Comment {
  id: number
  postId: number
  content: string
  author: string
  createdAt: string
}

export interface CreateCommentDto {
  postId: number
  content: string
  author: string
}
