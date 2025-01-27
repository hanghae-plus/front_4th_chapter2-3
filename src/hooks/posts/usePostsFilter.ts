import { useState, useEffect } from "react"
import { Tag } from "../../types/posts"

export const usePostsFilter = (
  onFilterChange: (tag: string, search: string, sortBy: string, sortOrder: string) => void,
) => {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTag, setSelectedTag] = useState("all")
  const [sortBy, setSortBy] = useState("none")
  const [sortOrder, setSortOrder] = useState("asc")
  const [tags, setTags] = useState<Tag[]>([])

  // 태그 데이터 가져오기
  const fetchTags = async () => {
    try {
      const response = await fetch("/api/posts/tags")
      const data = await response.json()
      setTags(data)
    } catch (error) {
      console.error("태그 가져오기 오류:", error)
    }
  }

  // 컴포넌트 마운트시 태그 데이터 로딩
  useEffect(() => {
    fetchTags()
  }, [])

  const handleSearchChange = (value: string) => {
    setSearchQuery(value)
  }

  const handleSearch = () => {
    onFilterChange(selectedTag, searchQuery, sortBy, sortOrder)
  }

  const handleTagChange = (value: string) => {
    setSelectedTag(value)
    onFilterChange(value, searchQuery, sortBy, sortOrder)
  }

  const handleSortByChange = (value: string) => {
    setSortBy(value)
    onFilterChange(selectedTag, searchQuery, value, sortOrder)
  }

  const handleSortOrderChange = (value: string) => {
    setSortOrder(value)
    onFilterChange(selectedTag, searchQuery, sortBy, value)
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
