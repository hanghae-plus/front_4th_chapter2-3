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

export type PostQueryType = "DEFAULT" | "BY_SEARCH" | "BY_TAG";
export type PostQueryKeyFn<T> = { key: (props: T) => unknown[]; fn: (arg: T) => Promise<PostsResponseDto> };

const POST_QUERY_TYPE_MAP: Record<PostQueryType, PostQueryKeyFn<any>> = {
  DEFAULT: { key: postQueryKey.list, fn: getPosts } as PostQueryKeyFn<PostsRequestDto>,
  BY_SEARCH: { key: postQueryKey.listBySearch, fn: searchPosts } as PostQueryKeyFn<string>,
  BY_TAG: { key: postQueryKey.listByTag, fn: getPostsByTag } as PostQueryKeyFn<string>,
};

export const usePostQuery = ({ limit, skip, sortBy, sortOrder, searchQuery, selectedTag }: PostSearchParams) => {
  const type = searchQuery ? "BY_SEARCH" : selectedTag ? "BY_TAG" : "DEFAULT";
  const paramByType = {
    BY_SEARCH: searchQuery,
    BY_TAG: selectedTag,
    DEFAULT: { limit, skip, sortBy, sortOrder },
  };

  console.log(type);
  console.log(paramByType[type]);

  return useQuery<PostsResponseDto>({
    queryKey: POST_QUERY_TYPE_MAP[type].key(paramByType[type]),
    queryFn: async () => POST_QUERY_TYPE_MAP[type].fn(paramByType[type]),
  });
};
