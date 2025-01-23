import { queryOptions, useQuery } from "@tanstack/react-query";
import { client } from "../../../shared/api";
import { ITag } from "./types";

export const fetchAllTags = async () => {
  const result = await client.get<ITag[]>("/api/posts/tags");
  return result.data;
};

const fetchQueryOptions = () => {
  return queryOptions({
    queryKey: ["tags"],
    queryFn: () => fetchAllTags(),
  });
};

type FetchQueryOptions = Omit<ReturnType<typeof fetchQueryOptions>, "queryKey" | "queryFn">;

export const useFetchAllTagsQuery = (options: FetchQueryOptions = {}) => {
  return useQuery({ ...fetchQueryOptions(), ...options });
};
