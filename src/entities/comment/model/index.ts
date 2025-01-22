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
