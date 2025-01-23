import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared"
import { useSearchParams } from "@/shared/hooks/use-search-params"

function PostFilterSortOrder() {
  const { getParam, setParam } = useSearchParams()

  return (
    <Select value={getParam("sortOrder") || ""} onValueChange={(value) => setParam("sortOrder", value)}>
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

export { PostFilterSortOrder }
