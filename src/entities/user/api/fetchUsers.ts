import { request } from "../../../shared";
import { UserResponse } from "./types";

export const fetchUsers = async (
  {
    limit = 0,
    select = ["username", "image"],
  }: {
    limit: number;
    select: string[];
  } = {
    limit: 0,
    select: ["username", "image"],
  },
) => {
  return request.get<UserResponse>(`/api/users`, {
    params: { limit, select },
  });
};
