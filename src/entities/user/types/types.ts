type Address = {
  address: string
  city: string
  state: string
}

type Company = {
  name: string
  title: string
}

export type User = {
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

export type UserResponse = {
  limit: number
  skip: number
  total: number
  users: User[]
}

export type CommentUser = Pick<User, "id" | "username"> & {
  fullName: string
}
