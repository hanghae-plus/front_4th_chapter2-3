export interface User {
  id: number
  image: string
  username: string
}

export interface UserResponse {
  limit: number
  skip: number
  total: number
  users: User[]
}
