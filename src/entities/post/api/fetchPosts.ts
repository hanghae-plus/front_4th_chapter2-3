import { queryOptions, useQuery } from "@tanstack/react-query";
import { client } from "../../../shared/api";
import { IPost } from "./types";

export interface FetchPostsParams {
  searchQuery?: string;
  selectedTag?: string;
  sortBy?: string;
  order?: string;
  limit?: number;
  skip?: number;
}

export interface FetchPostsResult {
  posts: IPost[];
  total: number;
  limit: number;
  skip: number;
}

export const fetchPosts = async (params: FetchPostsParams) => {
  const queryParams = new URLSearchParams();

  // searchQuery에 값이 있을 때, searchQuery를 포함하는 게시글 가져오기
  if (![undefined, ""].includes(params.searchQuery)) {
    const { searchQuery, ...rest } = params;

    Object.entries(rest)
      .filter(([, value]) => value !== undefined)
      .forEach(([key, value]) => queryParams.append(key, value.toString()));

    const result = await client.get<FetchPostsResult>(
      `/api/posts/search?q=${searchQuery}&${queryParams.toString()}`,
    );
    return result.data;
  }

  // selectedTag에 값이 있을 때, selectedTag를 포함하는 게시글 가져오기
  if (![undefined, ""].includes(params.selectedTag)) {
    const { selectedTag, ...rest } = params;

    Object.entries(rest)
      .filter(([, value]) => value !== undefined)
      .forEach(([key, value]) => queryParams.append(key, value.toString()));

    const result = await client.get<FetchPostsResult>(
      `/api/posts/tag/${selectedTag}?${queryParams.toString()}`,
    );
    return result.data;
  }

  Object.entries(params)
    .filter(([, value]) => value !== undefined)
    .forEach(([key, value]) => queryParams.append(key, value.toString()));

  const result = await client.get<FetchPostsResult>(`/api/posts?${queryParams.toString()}`);
  return result.data;
};

const fetchQueryOptions = (params: FetchPostsParams) => {
  return queryOptions({
    queryKey: ["posts", params],
    queryFn: () => fetchPosts(params),
  });
};

type FetchQueryOptions = Omit<ReturnType<typeof fetchQueryOptions>, "queryKey" | "queryFn">;

export const useFetchPostsQuery = (params: FetchPostsParams, options: FetchQueryOptions = {}) => {
  return useQuery({ ...fetchQueryOptions(params), ...options });
};
