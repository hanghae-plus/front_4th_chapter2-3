import { useSuspenseQuery } from "@tanstack/react-query";

import { getPosts } from "@/entities/posts";

import { postsKeys } from "../lib";

export const useSuspenseQueryGetPosts = (limit: number, skip: number) => {
  return useSuspenseQuery({
    queryKey: postsKeys.getPosts(limit, skip).queryKey,
    queryFn: () => getPosts(limit, skip),
  });
};
