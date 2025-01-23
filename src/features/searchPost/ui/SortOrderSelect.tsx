import { useAtom } from "jotai"
import { sortOrderAtom } from "../model"
import { SelectContainer, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../shared/ui/select"

export const SortOrderSelect = () => {
  const [sortOrder, setSortOrder] = useAtom(sortOrderAtom)

  return (
    <SelectContainer value={sortOrder} onValueChange={setSortOrder}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="정렬 순서" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="asc">오름차순</SelectItem>
        <SelectItem value="desc">내림차순</SelectItem>
      </SelectContent>
    </SelectContainer>
  )
}
