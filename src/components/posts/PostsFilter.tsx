import { useEffect } from "react"
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
    fetchTags,
  } = usePostsStore()

  useEffect(() => {
    fetchTags()
  }, [])

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
          <SelectItem key="all" value="all">
            전체
          </SelectItem>
          {tags.map((tag) => (
            <SelectItem key={`${tag.id}-${tag.slug}`} value={tag.slug}>
              {tag.slug}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={sortBy}
        onValueChange={(value) => {
          setSortBy(value)
          fetchPosts(0, 10, selectedTag, searchQuery, value, sortOrder)
        }}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="정렬 기준" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem key="none" value="none">
            기본
          </SelectItem>
          <SelectItem key="title" value="title">
            제목
          </SelectItem>
          <SelectItem key="likes" value="likes">
            좋아요
          </SelectItem>
        </SelectContent>
      </Select>

      <Select
        value={sortOrder}
        onValueChange={(value) => {
          setSortOrder(value)
          fetchPosts(0, 10, selectedTag, searchQuery, sortBy, value)
        }}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="정렬 순서" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem key="asc" value="asc">
            오름차순
          </SelectItem>
          <SelectItem key="desc" value="desc">
            내림차순
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
