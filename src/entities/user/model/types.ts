export interface UsersResponseDto {
  users: User[];
  total: number;
  skip: number;
  limit: number;
}

export interface User {
  id: number;
  username: string;
  image: string;
  firstName?: string;
  lastName?: string;
  age?: string;
  email?: string;
  phone?: string;
  address?: Address;
  company?: Company;
}

interface Address {
  address: string;
  city: string;
  state: string;
}

interface Company {
  name: string;
  title: string;
}
