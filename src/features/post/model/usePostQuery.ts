import {
  getPosts,
  getPostsByTag,
  PostSearchParams,
  PostsRequestDto,
  PostsResponseDto,
  searchPosts,
} from "@entities/post";
import { useQuery } from "@tanstack/react-query";
import { postQueryKey } from "./postQueryKey";
import { useSearchParams } from "react-router-dom";

export type PostQueryType = "DEFAULT" | "BY_SEARCH" | "BY_TAG";
export type PostQueryKeyFn<T> = { key: (props: T) => unknown[]; fn: (arg: T) => Promise<PostsResponseDto> };

const getPostsQueryType = ({ searchQuery, selectedTag }: PostSearchParams) => {
  if (searchQuery) return "BY_SEARCH";
  if (selectedTag) return "BY_TAG";
  return "DEFAULT";
};

const POST_QUERY_TYPE_MAP: Record<PostQueryType, PostQueryKeyFn<any>> = {
  DEFAULT: { key: postQueryKey.list, fn: getPosts } as PostQueryKeyFn<PostsRequestDto>,
  BY_SEARCH: { key: postQueryKey.listBySearch, fn: searchPosts } as PostQueryKeyFn<string>,
  BY_TAG: { key: postQueryKey.listByTag, fn: getPostsByTag } as PostQueryKeyFn<string>,
};

export const usePostQuery = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const limit = Number(searchParams.get("limit") ?? "10");
  const skip = Number(searchParams.get("skip") ?? "0");
  const searchQuery = searchParams.get("searchQuery") ?? "";
  const selectedTag = searchParams.get("selectedTag") ?? "";
  const sortBy = searchParams.get("sortBy") ?? "";
  const sortOrder = searchParams.get("sortOrder") ?? "asc";

  const updatePostSearchParams = (key: keyof PostSearchParams, value: string) => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      newParams.set(key, value);
      return newParams;
    });
  };

  const type = getPostsQueryType({ searchQuery, selectedTag });

  const paramByType = {
    BY_SEARCH: searchQuery,
    BY_TAG: selectedTag,
    DEFAULT: { limit, skip, sortBy, sortOrder },
  };

  const { data, isSuccess, isLoading } = useQuery<PostsResponseDto>({
    queryKey: POST_QUERY_TYPE_MAP[type].key(paramByType[type]),
    queryFn: async () => POST_QUERY_TYPE_MAP[type].fn(paramByType[type]),
  });

  return {
    data,
    isSuccess,
    isLoading,
    limit,
    skip,
    searchQuery,
    selectedTag,
    sortBy,
    sortOrder,
    updatePostSearchParams,
  };
};
