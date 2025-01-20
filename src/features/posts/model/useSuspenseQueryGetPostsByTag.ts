import { useSuspenseQuery } from "@tanstack/react-query";

import { getPostsByTag } from "@/entities/posts";

import { postsKeys } from "../lib";

export const useSuspenseQueryGetPostsByTag = (tag: string) => {
  return useSuspenseQuery({
    queryKey: postsKeys.getPostsByTag(tag).queryKey,
    queryFn: () => getPostsByTag(tag),
  });
};
