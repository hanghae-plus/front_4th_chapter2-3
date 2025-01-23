import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../shared/ui"
import useSelectTag from "../model/useSelectTag.ts"
import updateSearchParams from "../../../modules/search/model/updateSearchParams.ts"

export default function SelectTag() {
  const {
    tags,
    selectedTag,
    handleValueChange
  } = useSelectTag();
  return (
    <Select
      value={selectedTag}
      onValueChange={handleValueChange}
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
  )
}