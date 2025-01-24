import { useQuery } from "@tanstack/react-query"
import { PostApi } from "../../../entities/post/api/postApi"

export const usePosts = (limit: number, skip: number) => {
  return useQuery({
    queryKey: ["posts", { limit, skip }],
    queryFn: () => PostApi.getPosts(limit, skip),
  })
}
