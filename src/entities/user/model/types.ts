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
}
