import type { Address } from "./address"
import type { Company } from "./company"

export interface User {
  id: number
  image: string
  username: string
  firstName: string
  lastName: string
  age: number
  email: string
  phone: number
  address: Address
  company: Company
}
