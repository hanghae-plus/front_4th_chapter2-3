export interface Address {
  address: string
  city: string
  state: string
}

interface Company {
  name: string
  title: string
}

export interface User {
  id: number
  image: string
  username: string
  firstName: string
  lastName: string
  age: number
  email: string
  phone: string
  address: Address
  company: Company
}

export interface UserResponse {
  limit: number
  skip: number
  total: number
  users: User[]
}

export type CommentUser = Pick<User, "id" | "username"> & {
  fullName: string
}
