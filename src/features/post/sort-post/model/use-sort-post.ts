import { useQueryParams } from "../../../../shared/lib"

export const useSortPost = () => {
  const { updateURLParams } = useQueryParams()

  const handleSortByChange = (value: string) => {
    updateURLParams({ sortBy: value || null })
  }

  const handleSortOrderChange = (value: string) => {
    updateURLParams({ sortOrder: value })
  }

  return { handleSortByChange, handleSortOrderChange }
}
