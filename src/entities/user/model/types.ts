export interface IUser {
  id: number
  username: string
  image: string
  firstName?: string
  lastName?: string
  age?: number
  email?: string
  phone?: string
  address?: Address
  company?: Company
}

export interface Address {
  address: string
  city: string
  state: string
}

export interface Company {
  name: string
  title: string
}

export interface User {
  id: string
  username: string
  firstName: string
  lastName: string
  age: number
  email: string
  phone: string
  image: string
  address: Address
  company: Company
}
