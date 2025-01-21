import { Select } from "@shared/ui/Select"
import { PostTag } from "@entities/post/model"

interface FilterControlsProps {
  selectedTag: string
  tags: PostTag[]
  onTagChange: (tag: string) => void
  sortBy: string
  onSortByChange: (value: string) => void
  sortOrder: string
  onSortOrderChange: (value: string) => void
}

export const FilterControls = ({
  selectedTag,
  tags,
  onTagChange,
  sortBy,
  onSortByChange,
  sortOrder,
  onSortOrderChange,
}: FilterControlsProps) => (
  <div className="flex gap-4">
    <Select value={selectedTag} onValueChange={onTagChange}>
      <Select.Trigger className="w-[180px]">
        <Select.Value placeholder="태그 선택" />
      </Select.Trigger>
      <Select.Content>
        <Select.Item value="all">모든 태그</Select.Item>
        {tags.map((tag) => (
          <Select.Item key={tag.url} value={tag.slug}>
            {tag.slug}
          </Select.Item>
        ))}
      </Select.Content>
    </Select>
    <Select value={sortBy} onValueChange={onSortByChange}>
      <Select.Trigger className="w-[180px]">
        <Select.Value placeholder="정렬 기준" />
      </Select.Trigger>
      <Select.Content>
        <Select.Item value="none">없음</Select.Item>
        <Select.Item value="id">ID</Select.Item>
        <Select.Item value="title">제목</Select.Item>
        <Select.Item value="reactions">반응</Select.Item>
      </Select.Content>
    </Select>
    <Select value={sortOrder} onValueChange={onSortOrderChange}>
      <Select.Trigger className="w-[180px]">
        <Select.Value placeholder="정렬 순서" />
      </Select.Trigger>
      <Select.Content>
        <Select.Item value="asc">오름차순</Select.Item>
        <Select.Item value="desc">내림차순</Select.Item>
      </Select.Content>
    </Select>
  </div>
)
