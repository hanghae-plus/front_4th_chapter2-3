import { ListResponse } from "@/shared/model";

import { User } from "../model";

export const getUsers = async () => {
  const response = await fetch("/api/users?limit=0&select=username,image");

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = (await response.json()) as ListResponse<{ users: User[] }>;

  return data;
};
