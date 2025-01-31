import { useQuery } from "@tanstack/react-query"
import { QUERY_KEYS } from "@shared/config/QueryKeys"
import { PostResponse } from "./useGetPostList"

export const useGetSearchPostList = (searchQuery: string) => {
  return useQuery<Omit<PostResponse, "skip" | "limit">>({
    queryKey: QUERY_KEYS.POST.getPostList(searchQuery),
    queryFn: async () => {
      const response = await fetch(`/api/posts/search?q=${searchQuery}`)

      if (!response.ok) {
        throw new Error("Search posts failed")
      }

      const postsData: PostResponse = await response.json()

      return {
        posts: postsData.posts,
        total: postsData.total,
      }
    },
    enabled: !!searchQuery,
  })
}
