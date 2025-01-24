export interface Comment {
  id?: number
  body: string
  postId: number | null
  userId: number
  likes?: number
  user: {
    username: string
  }
}
export type CommentForm = Pick<Comment, "body" | "userId" | "postId">

export type Comments = Record<number, Comment[]>
