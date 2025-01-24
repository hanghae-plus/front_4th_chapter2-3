import { SortOrder } from "@/entities/post/api"
import { usePage } from "@/pages/model/usePage.ts"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui"

export function PostSortOrderSelect() {
  const { sortOrder, setSortOrder } = usePage()

  function handleSortOrderChange(value: SortOrder) {
    setSortOrder(value)
  }

  return (
    <Select value={sortOrder || "asc"} onValueChange={handleSortOrderChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="정렬 순서" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="asc">오름차순</SelectItem>
        <SelectItem value="desc">내림차순</SelectItem>
      </SelectContent>
    </Select>
  )
}
