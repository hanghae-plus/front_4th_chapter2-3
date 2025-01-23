import { queryOptions } from "@tanstack/react-query"

import { commentsApi } from "./api"

export const commentQueries = {
  all: () => ["comments"] as const,
  byPost: (postId: number) => [...commentQueries.all(), "byPost", postId] as const,
  byPostQuery: (postId: number) =>
    queryOptions({
      queryKey: commentQueries.byPost(postId),
      queryFn: () => commentsApi.fetchComments(postId),
      enabled: !!postId,
    }),
}
