import { Tag } from "../../../entities/tag/model/types"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../shared/ui"

interface TagSelectProps {
  selectedTag: string
  tags: Tag[]
  onTagChange: (value: string) => void
}

export const TagSelect = ({ selectedTag, tags, onTagChange }: TagSelectProps) => (
  <Select value={selectedTag} onValueChange={onTagChange}>
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
