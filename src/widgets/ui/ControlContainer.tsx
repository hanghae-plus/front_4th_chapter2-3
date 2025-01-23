import { useStore } from "../../app/store"
import { Search } from "lucide-react"
import { Input, Pagination, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../shared/ui"
import { PostTable } from "../../widgets/ui"
import { searchPosts, fetchPostsByTag } from "../../features/post/api"
import { useUpdateURL } from "../../shared/api"

export const ControlContainer = () => {
  const updateURL = useUpdateURL()
  // 상태 관리
  const {
    searchQuery,
    sortBy,
    sortOrder,
    loading,
    tags,
    selectedTag,
    setSearchQuery,
    setSortBy,
    setSortOrder,
    setSelectedTag,
  } = useStore()

  return (
    <div className="flex flex-col gap-4">
      {/* 검색 및 필터 컨트롤 */}
      <div className="flex gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="게시물 검색..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && searchPosts()}
            />
          </div>
        </div>
        <Select
          value={selectedTag}
          onValueChange={(value) => {
            setSelectedTag(value)
            fetchPostsByTag(value)
            updateURL()
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="태그 선택" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">모든 태그</SelectItem>
            {tags.map((tag) => (
              <SelectItem key={tag.url} value={tag.slug}>
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
            <SelectItem value="none">없음</SelectItem>
            <SelectItem value="id">ID</SelectItem>
            <SelectItem value="title">제목</SelectItem>
            <SelectItem value="reactions">반응</SelectItem>
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
      {loading ? <div className="flex justify-center p-4">로딩 중...</div> : <PostTable />}
      <Pagination />
    </div>
  )
}
