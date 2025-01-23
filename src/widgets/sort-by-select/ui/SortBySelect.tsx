import { usePageParamActions, useSortBy } from "../../../entities/tag/model/store/PageParamProvider"
import { Select } from "../../../shared/ui"

export const SortBySelect = () => {
  const actions = usePageParamActions()
  const sortBy = useSortBy()

  return (
    <Select
      value={sortBy}
      onValueChange={(string) => {
        actions.setSortBy(string)
      }}
    >
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
  )
}
