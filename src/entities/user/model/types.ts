interface Address {
  address: string
  city: string
  state: string
  stateCode: string
  postalCode: string
}

interface Bank {
  cardExpire: string
  cardNumber: string
  cardType: string
  currency: string
  iban: string
}

interface Company {
  department: string
  name: string
  title: string
  address: Address
}

interface Crypto {
  coin: string
  wallet: string
  network: string
}

interface Hair {
  color: string
  type: string
}

interface User {
  id: number
  firstName: string
  lastName: string
  maidenName: string
  age: number
  gender: string
  email: string
  phone: string
  username: string
  password: string
  birthDate: string
  image: string
  bloodGroup: string
  height: number
  weight: number
  eyeColor: string
  hair: Hair
  role: string
  address: Address
  bank: Bank
  company: Company
  crypto: Crypto
  ein: string
  ssn: string
  userAgent: string
  ip: string
  macAddress: string
  university: string
}

export type { Address, Bank, Company, Crypto, Hair, User }
