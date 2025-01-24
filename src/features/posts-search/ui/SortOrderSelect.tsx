import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../shared/ui"

interface SortOrderSelectProps {
  sortOrder: string
  onSortOrderChange: (value: string) => void
}

export const SortOrderSelect = ({ sortOrder, onSortOrderChange }: SortOrderSelectProps) => (
  <Select value={sortOrder} onValueChange={onSortOrderChange}>
    <SelectTrigger className="w-[180px]">
      <SelectValue placeholder="정렬 순서" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="asc">오름차순</SelectItem>
      <SelectItem value="desc">내림차순</SelectItem>
    </SelectContent>
  </Select>
)
