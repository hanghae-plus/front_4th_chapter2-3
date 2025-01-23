import { useSuspenseQuery } from "@tanstack/react-query";

import {
  getPosts,
  getPostsByQuery,
  GetPostsByQueryProps,
  getPostsByTag,
  GetPostsByTagProps,
  GetPostsProps,
} from "@/entities/posts";

import { postsKeys } from "../lib";

type UseSuspenseQueryGetPostsProps = GetPostsProps & GetPostsByQueryProps & GetPostsByTagProps;

export const useSuspenseQueryGetPosts = ({
  limit,
  skip,
  searchQuery,
  tag,
  sortBy,
  order,
}: UseSuspenseQueryGetPostsProps) => {
  return useSuspenseQuery({
    queryKey: postsKeys.getPosts({ limit, skip, searchQuery, tag, sortBy, order }).queryKey,
    queryFn: () => {
      if (searchQuery) return getPostsByQuery({ searchQuery, limit, skip, sortBy, order });
      if (tag && tag !== "all") return getPostsByTag({ tag, limit, skip, sortBy, order });
      return getPosts({ limit, skip, sortBy, order });
    },
  });
};
