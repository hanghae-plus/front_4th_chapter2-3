import { InfUser } from "../model/userTypes.ts"

export const getUsers = async () => {
  const response = await fetch("/api/users?limit=0&select=username,image");
  return response.json();
};

export const getUserById = async (user : InfUser) : Promise<InfUser> => {
  const response = await fetch(`/api/users/${user.id}`);
  return response.json();
};