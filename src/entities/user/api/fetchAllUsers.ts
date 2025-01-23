import { queryOptions, useQuery } from "@tanstack/react-query";
import { client } from "../../../shared/api";
import { IUser } from "./types";

export interface FetchAllUsersResult {
  users: Pick<IUser, "username" | "image">[];
  total: number;
  limit: number;
  skip: number;
}

export const fetchAllUsers = async () => {
  const result = await client.get<FetchAllUsersResult>("/api/users?select=username,image&limit=0");
  return result.data;
};

const fetchQueryOptions = () => {
  return queryOptions({
    queryKey: ["users"],
    queryFn: () => fetchAllUsers(),
  });
};

type FetchQueryOptions = Omit<ReturnType<typeof fetchQueryOptions>, "queryKey" | "queryFn">;

export const useFetchAllUsersQuery = (options: FetchQueryOptions = {}) => {
  return useQuery({ ...fetchQueryOptions(), ...options });
};
