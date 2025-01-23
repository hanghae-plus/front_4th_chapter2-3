export interface User {
  id: number
  image: string
  username: string
}

export interface UserInfo {
  address: Address
  age: number
  bank: Bank
  birthDate: string
  bloodGroup: string
  company: Company
  crypto: Crypto
  ein: string
  email: string
  eyeColor: string
  firstName: string
  gender: string
  hair: {
    color: string
    type: string
  }
  height: number
  id: number
  image: string
  ip: string
  lastName: string
  macAddress: string
  maidenName: string
  password: string
  phone: string
  role: string
  ssn: string
  university: string
  userAgent: string
  username: string
  weight: number
}

interface Address {
  address: string
  city: string
  coordinates: {
    lat: number
    lng: number
  }
  country: string
  postalCode: string
  state: string
  stateCode: string
}

interface Bank {
  cardExpire: string
  cardNumber: string
  cardType: string
  currency: string
  iban: string
}

interface Company {
  address: Address
  department: string
  name: string
  title: string
}

interface Crypto {
  coin: string
  network: string
  wallet: string
}
