import { useEffect } from "react"
import { useAtom } from "jotai"
import { selectedTagAtom } from "@features/searchPost/model"
import { tagsAtom } from "@entities/tag/model"
import { useTagsQuery } from "@entities/tag/api"
import { SelectContainer, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@shared/ui/select"

export const TagSelect = () => {
  const [tags, setTags] = useAtom(tagsAtom)
  const [selectedTag, setSelectedTag] = useAtom(selectedTagAtom)

  const { data, isLoading } = useTagsQuery()

  useEffect(() => {
    if (!isLoading && data) {
      setTags(data)
    }
  }, [data, isLoading])

  return (
    <SelectContainer value={selectedTag} onValueChange={(value) => setSelectedTag(value)}>
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
    </SelectContainer>
  )
}
