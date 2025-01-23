import { usePageParamActions, useSortOrder } from "../../../entities/tag/model/store/PageParamProvider"
import { Select } from "../../../shared/ui"

export const SortOrderSelect = () => {
  const actions = usePageParamActions()
  const sortOrder = useSortOrder()

  return (
    <Select value={sortOrder} onValueChange={actions.setSortOrder}>
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
