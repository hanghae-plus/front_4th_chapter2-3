import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared"
import { useSearchParams } from "@/shared/hooks/use-search-params"
import { useQueryTags } from "../model/use-query-tags"

function PostFilterTag() {
  const { getParam, setParam } = useSearchParams()
  const { data: tags } = useQueryTags()

  return (
    <Select value={getParam("tag") || ""} onValueChange={(value) => setParam("tag", value)}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="태그 선택" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">모든 태그</SelectItem>
        {tags?.map((tag) => (
          <SelectItem key={tag.id} value={tag.name}>
            {tag.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export { PostFilterTag }
