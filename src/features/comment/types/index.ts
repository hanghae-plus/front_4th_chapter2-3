export interface Comment {
  body: string
  id: number
  likes: number
  postId: number
  user: User
}

interface User {
  fullName: string
  id: number
  username: string
}
