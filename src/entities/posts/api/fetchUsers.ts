import { InfUser } from "../types/types.ts"

export const fetchUsers = async () => {
  const response = await fetch("/api/users?limit=0&select=username,image");
  return response.json();
};

export const fetchGetUser = async (user : InfUser) : Promise<InfUser> => {
  const response = await fetch(`/api/users/${user.id}`);
  return response.json();
};