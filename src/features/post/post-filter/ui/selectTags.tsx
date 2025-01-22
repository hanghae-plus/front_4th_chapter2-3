import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui"
import { usePostFilterTags } from "../model/hooks"

interface SelectTagsProps {
  updateURL: () => void
}

export const SelectTags = ({ updateURL }: SelectTagsProps) => {
  const { tags, selectedTag, onChangeTag } = usePostFilterTags()

  return (
    <Select
      value={selectedTag}
      onValueChange={(value) => {
        onChangeTag(value)
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
  )
}
