import { useSuspenseQuery } from "@tanstack/react-query";

import { getPostsByQuery } from "@/entities/posts";

import { postsKeys } from "../lib";

export const useSuspenseQueryGetPostsByQuery = (searchQuery: string) => {
  return useSuspenseQuery({
    queryKey: postsKeys.getPostsByQuery(searchQuery).queryKey,
    queryFn: () => getPostsByQuery(searchQuery),
  });
};
