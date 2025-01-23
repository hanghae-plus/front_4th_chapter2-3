import { User } from "@/types/user.ts";

export const fetchUsers = async (): Promise<User[]> => {
  const response = await fetch("/api/users?limit=0&select=username,image");
  const data = await response.json();
  return data.users;
};
