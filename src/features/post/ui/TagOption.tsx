import { SelectItem } from "@shared/ui"
import { Tag } from "@entities/post/types"

interface TagProps {
  tag: Tag
}

export function TagOption(props: TagProps) {
  const { tag } = props

  return (
    <SelectItem key={tag.url} value={tag.slug}>
      {tag.slug}
    </SelectItem>
  )
}
