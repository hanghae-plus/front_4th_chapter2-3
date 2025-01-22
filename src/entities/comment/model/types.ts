export interface Comment {
  id: number
  body: string
  postId: number | null
  userId: number
  user: {
    username: string
  }
  likes: number
}
export interface CommentsMap {
  [key: number]: Comment[]
}

export type NewComment = Pick<Comment, "body" | "postId" | "userId">
