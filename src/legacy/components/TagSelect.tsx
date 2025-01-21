import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../shared/ui'
import { useTagParam } from '../hooks/useQueryParams'
import { Tag } from '../models/types'
import { useGetPostTags } from '../queries/post.query'

interface TagSelectProps {
  onValueChange: (value: string) => void
}

export const TagSelect = ({ onValueChange }: TagSelectProps) => {
  const { data: tags } = useGetPostTags()
  const [selectedTag, setSelectedTag] = useTagParam()

  return (
    <Select
      value={selectedTag}
      onValueChange={(value) => {
        setSelectedTag(value)
        onValueChange(value)
      }}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="태그 선택" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">모든 태그</SelectItem>
        {tags?.map((tag: Tag) => (
          <SelectItem key={tag.url} value={tag.slug}>
            {tag.slug}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
