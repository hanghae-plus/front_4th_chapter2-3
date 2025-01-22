import { Select } from "../../../shared/ui"

interface SortOrderSelectProps {
  sortOrder: string
  setSortOrder: (sortOrder: string) => void
}

export const SortOrderSelect = ({ sortOrder, setSortOrder }: SortOrderSelectProps) => {
  return (
    <Select value={sortOrder} onValueChange={setSortOrder}>
      <Select.Trigger className="w-[180px]">
        <Select.Value placeholder="정렬 순서" />
      </Select.Trigger>
      <Select.Content>
        <Select.Item value="asc">오름차순</Select.Item>
        <Select.Item value="desc">내림차순</Select.Item>
      </Select.Content>
    </Select>
  )
}
