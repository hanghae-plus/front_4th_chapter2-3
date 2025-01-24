import { usePostRouteParams } from "@/pages/model/usePostRouteParams.ts"
import { useTag } from "@/features/tag/model/useTag.ts"
import { useQueryPosts } from "@/features/post/api"

export const useQueryPostTable = () => {
  const { searchQuery, skip, limit, sortBy, sortOrder } = usePostRouteParams()
  const { selectedTag } = useTag()

  return useQueryPosts({
    searchQuery,
    selectedTag,
    limit,
    skip,
    sortBy,
    sortOrder,
  })
}
