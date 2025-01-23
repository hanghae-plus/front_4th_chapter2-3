import { CommentUser } from "@entities/user/types"

export type Comment = {
  id: number
  body: string
  postId: number
  likes: number
  user: CommentUser
}

export type RequestComment = Partial<Comment>

export type CommentsResponse = {
  comments: Comment[]
  total: number
  skip: number
  limit: number
}
