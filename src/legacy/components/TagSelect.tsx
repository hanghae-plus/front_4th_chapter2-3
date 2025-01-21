import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../shared/ui'
import { Tag } from '../models/types'

interface TagSelectProps {
  selectedTag: string
  tags: Tag[]
  onValueChange: (value: string) => void
}

export const TagSelect = ({ selectedTag, tags, onValueChange }: TagSelectProps) => {
  return (
    <Select value={selectedTag} onValueChange={onValueChange}>
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
