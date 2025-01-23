import { useLimit, usePageParamActions, useSkip } from "../../../entities/tag/model/store/PageParamProvider"
import { Button, Select } from "../../../shared/ui"

interface PaginationProps {
  total: number
}

export const Pagination = ({ total }: PaginationProps) => {
  const actions = usePageParamActions()
  const skip = useSkip()
  const limit = useLimit()

  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-2">
        <span>표시</span>
        <Select value={limit.toString()} onValueChange={(value) => actions.setLimit(Number(value))}>
          <Select.Trigger className="w-[180px]">
            <Select.Value placeholder="10" />
          </Select.Trigger>
          <Select.Content>
            <Select.Item value="10">10</Select.Item>
            <Select.Item value="20">20</Select.Item>
            <Select.Item value="30">30</Select.Item>
          </Select.Content>
        </Select>
        <span>항목</span>
      </div>
      {/* Feature - ?? */}
      <div className="flex gap-2">
        <Button disabled={skip === 0} onClick={() => actions.setSkip(Math.max(0, skip - limit))}>
          이전
        </Button>
        <Button disabled={skip + limit >= total} onClick={() => actions.setSkip(skip + limit)}>
          다음
        </Button>
      </div>
    </div>
  )
}
