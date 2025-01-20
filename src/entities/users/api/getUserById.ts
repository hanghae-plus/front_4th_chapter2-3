import { User } from "../model";

export const getUserById = async (userId: User["id"]) => {
  const response = await fetch(`/api/users/${userId}`);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = (await response.json()) as User;

  return data;
};
