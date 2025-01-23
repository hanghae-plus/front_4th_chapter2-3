import { useSearchParams } from "react-router-dom"
import { SearchParams } from "@entities/post/types"
import { useSuspenseQuery } from "@tanstack/react-query"
import { getPostsWithUserBySearch, getPostsWithUserByTag, getPostsWithUsers } from "@features/post/lib"
import { postKeys } from "@entities/post/lib"

export const usePostsQuery = () => {
  const [searchParams] = useSearchParams()
  const searchQuery = searchParams.get("search") ?? ""
  const tag = searchParams.get("tag") ?? "all"
  const skip = searchParams.get("skip") ?? "0"
  const limit = searchParams.get("limit") ?? "10"
  const sortBy = searchParams.get("sortBy") || ""
  const sortOrder = searchParams.get("sortOrder") || "asc"
  const params: SearchParams = { skip, limit, sortBy, sortOrder }

  return useSuspenseQuery({
    queryKey: postKeys.fetch({ ...params, searchQuery, tag }).queryKey,
    queryFn: () => {
      if (searchQuery) {
        return getPostsWithUserBySearch(searchQuery)
      }
      if (tag && tag !== "all") {
        return getPostsWithUserByTag(tag)
      }

      return getPostsWithUsers(params)
    },
  })
}
