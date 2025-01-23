import { useQuery } from "@tanstack/react-query"

import { postQueries } from "../../../../entities/post/api"
import { SortOrder } from "../../../../entities/post/model"
import { useQueryParams } from "../../../../shared/lib"

interface UseSearchPostProps {
  skip: number
  limit: number
  sortBy: string
  sortOrder: SortOrder
  searchQuery: string
}

export const useSearchPost = ({ skip, limit, sortBy, sortOrder, searchQuery }: UseSearchPostProps) => {
  const { updateURLParams } = useQueryParams()

  const { data: searchResults, isLoading } = useQuery({
    ...postQueries.searchQuery({
      limit,
      skip,
      sortBy,
      order: sortOrder,
      search: searchQuery,
    }),
    select: (data) => ({
      posts: data.posts,
      total: data.total,
    }),
  })

  const searchPosts = (value: string) => {
    updateURLParams({
      search: value || null,
      skip: "0",
    })
  }

  return { searchResults, isLoading, searchPosts }
}
