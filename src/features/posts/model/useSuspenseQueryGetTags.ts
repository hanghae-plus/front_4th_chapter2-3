import { useSuspenseQuery } from "@tanstack/react-query";

import { getTags } from "@/entities/posts";

import { postsKeys } from "../lib";

export const useSuspenseQueryGetTags = () => {
  return useSuspenseQuery({
    queryKey: postsKeys.getTags().queryKey,
    queryFn: () => getTags(),
  });
};
