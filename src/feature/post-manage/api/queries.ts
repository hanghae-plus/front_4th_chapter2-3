import { useQuery } from "@tanstack/react-query"
import { QUERY_KEYS } from "../../../entities/post/model/constants"
import { PostApi } from "../../../entities/post/api/postApi"

export const usePosts = (limit: number, skip: number) => {
  return useQuery({
    queryKey: QUERY_KEYS.posts.all,
    queryFn: () => PostApi.getPosts(limit, skip),
  })
}
