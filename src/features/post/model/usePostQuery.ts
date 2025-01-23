import { getPosts, getPostsByTag, PostsRequestDto, PostsResponseDto, searchPosts } from "@entities/post";
import { useQuery } from "@tanstack/react-query";
import { postQueryKey } from "./postQueryKey";

export type PostQueryType = "DEFAULT" | "BY_SEARCH" | "BY_TAG";
export type PostQueryKeyFn<T> = { key: (props: T) => unknown[]; fn: (arg: T) => Promise<PostsResponseDto> };

const POST_QUERY_TYPE_MAP: Record<PostQueryType, PostQueryKeyFn<any>> = {
  DEFAULT: { key: postQueryKey.list, fn: getPosts } as PostQueryKeyFn<PostsRequestDto>,
  BY_SEARCH: { key: postQueryKey.listBySearch, fn: searchPosts } as PostQueryKeyFn<string>,
  BY_TAG: { key: postQueryKey.listByTag, fn: getPostsByTag } as PostQueryKeyFn<string>,
};

export type UsePostQueryProps =
  | { type: "DEFAULT"; params: PostsRequestDto }
  | { type: "BY_SEARCH"; params: string }
  | { type: "BY_TAG"; params: string };

export const usePostQuery = ({ type, params }: UsePostQueryProps) => {
  return useQuery<PostsResponseDto>({
    queryKey: POST_QUERY_TYPE_MAP[type].key(params),
    queryFn: async () => POST_QUERY_TYPE_MAP[type].fn(params),
  });
};
