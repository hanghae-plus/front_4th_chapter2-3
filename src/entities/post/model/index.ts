import { useSuspenseQuery } from "@tanstack/react-query"
import { getPostsWithUsers } from "../lib"

export const usePostsQuery = (limit: number, skip: number) => {
  return useSuspenseQuery({
    queryKey: ["post", { limit, skip }],
    queryFn: () => getPostsWithUsers(limit, skip),
  })
}
