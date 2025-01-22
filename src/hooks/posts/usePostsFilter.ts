import { useState } from "react"
import { Tag } from "../../types/posts"

export const usePostsFilter = (onFilterChange: () => void) => {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTag, setSelectedTag] = useState("all")
  const [sortBy, setSortBy] = useState("none")
  const [sortOrder, setSortOrder] = useState("asc")
  const [tags] = useState<Tag[]>([])

  const handleSearchChange = (value: string) => {
    setSearchQuery(value)
  }

  const handleSearch = () => {
    onFilterChange()
  }

  const handleTagChange = (value: string) => {
    setSelectedTag(value)
    onFilterChange()
  }

  const handleSortByChange = (value: string) => {
    setSortBy(value)
    onFilterChange()
  }

  const handleSortOrderChange = (value: string) => {
    setSortOrder(value)
    onFilterChange()
  }

  return {
    searchQuery,
    sortBy,
    sortOrder,
    selectedTag,
    tags,
    handleSearchChange,
    handleSearch,
    handleTagChange,
    handleSortByChange,
    handleSortOrderChange,
  }
}
