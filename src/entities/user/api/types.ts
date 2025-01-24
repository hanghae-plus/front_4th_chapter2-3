import { User } from "../model/types";

export interface UserResponse {
  users: User[];
  total: number;
  skip: number;
  limit: number;
}
