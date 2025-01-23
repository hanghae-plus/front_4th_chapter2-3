import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared"
import { useSearchParams } from "@/shared/hooks/use-search-params"

function PostFilterSortBy() {
  const { getParam, setParam } = useSearchParams()

  return (
    <Select value={getParam("sortBy") || ""} onValueChange={(value) => setParam("sortBy", value)}>
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

export { PostFilterSortBy }
