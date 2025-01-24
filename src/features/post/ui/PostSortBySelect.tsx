import { SortBy } from "@/entities/post/api"
import { usePage } from "@/pages/model/usePage.ts"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui"

export function PostSortBySelect() {
  const { sortBy, setSortBy } = usePage()

  function handleSortByChange(value: SortBy) {
    setSortBy(value)
  }

  return (
    <Select value={sortBy || "none"} onValueChange={handleSortByChange}>
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
  )
}
