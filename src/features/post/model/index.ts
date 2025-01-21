import { useQuery, useSuspenseQuery } from "@tanstack/react-query"
import { getPostsWithUsers } from "@/features/post/lib"
import { fetchTags } from "@entities/post/api"

export const usePostsQuery = (limit: number, skip: number) => {
  return useSuspenseQuery({
    queryKey: ["post", { limit, skip }],
    queryFn: () => getPostsWithUsers(limit, skip),
  })
}

export const useTagsQuery = () => {
  return useQuery({
    queryKey: ["tags"],
    queryFn: () => fetchTags(),
  })
}
