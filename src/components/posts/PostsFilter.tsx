import { Search } from "lucide-react"
import { Input, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../shared/ui"
import { usePostsStore } from "../../stores/usePostsStore"
import { Button } from "../../shared/ui"

export const PostsFilter = () => {
  const {
    searchQuery,
    selectedTag,
    sortBy,
    sortOrder,
    tags,
    setSearchQuery,
    setSelectedTag,
    setSortBy,
    setSortOrder,
    fetchPosts,
  } = usePostsStore()

  const handleSearch = () => {
    fetchPosts(0, 10, selectedTag, searchQuery, sortBy, sortOrder)
  }

  const handleTagChange = (value: string) => {
    setSelectedTag(value)
    fetchPosts(0, 10, value, searchQuery, sortBy, sortOrder)
  }

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2">
        <Input
          placeholder="검색어를 입력하세요"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        <Button variant="ghost" size="sm" onClick={handleSearch}>
          <Search className="w-4 h-4" />
        </Button>
      </div>

      <Select value={selectedTag} onValueChange={handleTagChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="태그 선택" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">전체</SelectItem>
          {tags.map((tag) => (
            <SelectItem key={tag.id} value={tag.slug}>
              {tag.slug}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={sortBy} onValueChange={setSortBy}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="정렬 기준" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="none">기본</SelectItem>
          <SelectItem value="title">제목</SelectItem>
          <SelectItem value="likes">좋아요</SelectItem>
        </SelectContent>
      </Select>

      <Select value={sortOrder} onValueChange={setSortOrder}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="정렬 순서" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="asc">오름차순</SelectItem>
          <SelectItem value="desc">내림차순</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
