import { QUERY_KEY } from "@features/shared";

export const commentQueryKey = {
  base: [QUERY_KEY.COMMENT] as const,
  list: (postId: number) => [commentQueryKey.base, "list", postId],
};
