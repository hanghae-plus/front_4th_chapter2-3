import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@radix-ui/react-select"
import { Button } from "../shared/ui"

interface Props {
  limit: number
  total: number
  skip: 0 | 1
  onChangeLimit: (limit: number) => void
  onChangeSkip: (skip: 0 | 1) => void
}

export const Pagination = ({ limit, total, skip, onChangeLimit, onChangeSkip }: Props) => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-2">
        <span>표시</span>
        <Select value={limit.toString()} onValueChange={(value) => onChangeLimit(Number(value))}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="10" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="20">20</SelectItem>
            <SelectItem value="30">30</SelectItem>
          </SelectContent>
        </Select>
        <span>항목</span>
      </div>
      <div className="flex gap-2">
        <Button disabled={skip === 0} onClick={() => onChangeSkip(Math.max(0, skip - limit))}>
          이전
        </Button>
        <Button disabled={skip + limit >= total} onClick={() => onChangeSkip(skip + limit)}>
          다음
        </Button>
      </div>
    </div>
  )
}
