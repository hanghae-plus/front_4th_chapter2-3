import { queryOptions, useQuery } from "@tanstack/react-query";
import { client } from "../../../shared/api";
import { IComment } from "./types";

export interface FetchCommentsParams {
  postId: number;
  limit?: number;
  skip?: number;
}

export interface fetchCommentsResult {
  comments: IComment[];
  total: number;
  limit: number;
  skip: number;
}

export const fetchCommentsByPostId = async ({ postId, ...rest }: FetchCommentsParams) => {
  const queryParams = new URLSearchParams();

  Object.entries(rest)
    .filter(([, value]) => value !== undefined)
    .forEach(([key, value]) => queryParams.append(key, value.toString()));

  const result = await client.get<fetchCommentsResult>(`/api/comments/post/${postId}`);
  return result.data;
};

const fetchQueryOptions = (params: FetchCommentsParams) => {
  return queryOptions({
    queryKey: ["comments", params],
    queryFn: () => fetchCommentsByPostId(params),
  });
};

type FetchQueryOptions = Omit<ReturnType<typeof fetchQueryOptions>, "queryKey" | "queryFn">;

export const useFetchCommentsByPostId = (
  params: FetchCommentsParams,
  options: FetchQueryOptions = {},
) => {
  return useQuery({ ...fetchQueryOptions(params), ...options });
};
