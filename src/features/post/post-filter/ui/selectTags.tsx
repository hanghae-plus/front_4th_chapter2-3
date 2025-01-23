import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui"
import { usePostFilterTags } from "../model/hooks"
import { usePostUrlStore } from "../../post-url/model"

export const SelectTags = () => {
  const { tags, selectedTag, onChangeTag } = usePostFilterTags()
  const { updateURL } = usePostUrlStore()

  const handleTag = (value: string) => {
    onChangeTag(value)
    updateURL()
  }

  return (
    <Select value={selectedTag} onValueChange={handleTag}>
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
