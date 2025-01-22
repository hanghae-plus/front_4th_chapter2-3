import { useState, useEffect } from "react"
import { Tag } from "@/types/posts"

export const usePostsFilter = (onFilterChange: () => void) => {
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("")
  const [sortOrder, setSortOrder] = useState("asc")
  const [selectedTag, setSelectedTag] = useState("")
  const [tags, setTags] = useState<Tag[]>([])

  const fetchTags = async () => {
    try {
      const response = await fetch("/api/tags")
      const data = await response.json()
      setTags(data.tags)
    } catch (error) {
      console.error("태그 가져오기 오류:", error)
    }
  }

  const handleSearchChange = (value: string) => {
    setSearchQuery(value)
  }

  const handleSearch = async () => {
    onFilterChange()
  }

  const handleTagChange = async (tag: string) => {
    setSelectedTag(tag)
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

  useEffect(() => {
    fetchTags()
  }, [])

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
