import { usePage } from "@/pages/model/usePage.ts"
import { useTag } from "@/features/tag/model/useTag.ts"
import { useQueryPosts } from "@/features/post/api"

export const useQueryPostTable = () => {
  const { searchQuery, skip, limit, sortBy, sortOrder } = usePage()
  const { selectedTag } = useTag()
  return useQueryPosts({ searchQuery, selectedTag, limit, skip, sortBy, sortOrder })
}
