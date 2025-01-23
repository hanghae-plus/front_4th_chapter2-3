import { queryOptions, useQuery } from "@tanstack/react-query";
import { client } from "../../../shared/api";
import { IUser } from "./types";

export const fetchUserById = async (id: number) => {
  const result = await client.get<IUser>(`https://dummyjson.com/users/${id}`);
  return result.data;
};

const fetchQueryOptions = (id: number) => {
  return queryOptions({
    queryKey: ["users", id],
    queryFn: () => fetchUserById(id),
  });
};

type FetchQueryOptions = Omit<ReturnType<typeof fetchQueryOptions>, "queryKey" | "queryFn">;

export const useFetchUserByIdQuery = (id: number, options: FetchQueryOptions = {}) => {
  return useQuery({ ...fetchQueryOptions(id), ...options });
};
