export interface UserType {
  id: number
  username: string
  image: string
}

export interface UserResponse extends UserType {
  firstName: string
  lastName: string
  age: number
  email: string
  phone: string
  address: {
    address: string
    city: string
    state: string
  }
  company: {
    name: string
    title: string
  }
}
