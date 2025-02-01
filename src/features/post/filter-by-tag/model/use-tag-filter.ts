import { useQuery } from "@tanstack/react-query"

import { postQueries } from "../../../../entities/post/api"
import { SortOrder } from "../../../../entities/post/model"
import { useQueryParams } from "../../../../shared/lib"

interface UseTagFilterProps {
  skip: number
  limit: number
  sortBy: string
  sortOrder: SortOrder
  selectedTag: string
}

export const useTagFilter = ({ skip, limit, sortBy, sortOrder, selectedTag }: UseTagFilterProps) => {
  const { updateURLParams } = useQueryParams()

  const { data: tags = [] } = useQuery({
    ...postQueries.tagQuery(),
  })

  const { data: listByTag, isLoading } = useQuery({
    ...postQueries.listByTagQuery({
      limit,
      skip,
      sortBy,
      order: sortOrder,
      tag: selectedTag,
    }),
    select: (data) => ({
      posts: data.posts,
      total: data.total,
    }),
    enabled: !!selectedTag,
  })

  const handleTagChange = (value: string) => {
    updateURLParams({
      tag: value === "all" ? null : value,
      skip: "0",
    })
  }

  return {
    tags,
    listByTag,
    isLoading,
    handleTagChange,
  }
}
