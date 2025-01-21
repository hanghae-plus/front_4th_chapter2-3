import { Select } from "@shared/ui/Select"
import { Button } from "@shared/ui/Button"

interface PaginationControlsProps {
  skip: number
  limit: number
  total: number
  onLimitChange: (limit: number) => void
  onPrevPage: () => void
  onNextPage: () => void
}

export const PaginationControls = ({
  skip,
  limit,
  total,
  onLimitChange,
  onPrevPage,
  onNextPage,
}: PaginationControlsProps) => (
  <div className="flex justify-between items-center">
    <div className="flex items-center gap-2">
      <span>표시</span>
      <Select value={limit.toString()} onValueChange={(value) => onLimitChange(Number(value))}>
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
    <div className="flex gap-2">
      <Button disabled={skip === 0} onClick={onPrevPage}>
        이전
      </Button>
      <Button disabled={skip + limit >= total} onClick={onNextPage}>
        다음
      </Button>
    </div>
  </div>
)
