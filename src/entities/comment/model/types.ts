export type TComment = {
  id: number
  body: string
  postId: number | null
  userId: number
  likes: number
  user: {
    id: number
    username: string
    fullName: string
  }
}
