import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../../shared/ui"

interface TagFilterProps {
  selectedTag: string
  tags: Array<{ url: string; slug: string }>
  onTagChange: (value: string) => void
}

export const TagFilter = ({ selectedTag, tags, onTagChange }: TagFilterProps) => {
  return (
    <Select value={selectedTag} onValueChange={onTagChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="태그 선택" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">모든 태그</SelectItem>
        {tags?.map((tag) => (
          <SelectItem key={tag.url} value={tag.slug}>
            {tag.slug}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
