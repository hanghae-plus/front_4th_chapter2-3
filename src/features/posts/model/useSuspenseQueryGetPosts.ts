import { useSuspenseQuery } from "@tanstack/react-query";

import { getPosts, getPostsByQuery, getPostsByTag } from "@/entities/posts";

import { postsKeys } from "../lib";

interface UseSuspenseQueryGetPostsProps {
  limit: number;
  skip: number;
  searchQuery?: string;
  tag?: string;
}

export const useSuspenseQueryGetPosts = ({ limit, skip, searchQuery, tag }: UseSuspenseQueryGetPostsProps) => {
  return useSuspenseQuery({
    queryKey: postsKeys.getPosts({ limit, skip, searchQuery, tag }).queryKey,
    queryFn: () => {
      if (searchQuery) return getPostsByQuery({ searchQuery, limit, skip });
      if (tag && tag !== "all") return getPostsByTag({ tag, limit, skip });
      return getPosts(limit, skip);
    },
  });
};
