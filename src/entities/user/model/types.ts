export interface User {
  id: number
  username: string
  image: string
  firstName?: string
  lastName?: string
  age?: number
  email?: string
  phone?: string
  address?: {
    address: string
    city: string
    state: string
  }
  company?: {
    name: string
    title: string
  }
}

export interface FetchUsersParams {
  limit?: number
  skip?: number
  select?: string
}

export interface SearchUsersParams {
  query: string
  limit?: number
  skip?: number
}
