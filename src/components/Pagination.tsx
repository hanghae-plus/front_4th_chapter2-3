import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../shared/ui/Select/ui"
import { Button } from "../shared/ui/Button/ui"
import { useSearchStore } from "../shared/model/useSearchStore"

interface PaginationProps {
  total: number
}

function Pagination(props: PaginationProps) {
  const { total } = props
  const { searchParams, updateSearchParams } = useSearchStore()

  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-2">
        <span>표시</span>
        <Select
          value={searchParams.limit.toString()}
          onValueChange={(value) => updateSearchParams("limit", Number(value))}
        >
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
        <Button
          disabled={searchParams.skip === 0}
          onClick={() => updateSearchParams("limit", Math.max(0, (searchParams.skip || 0) - searchParams.limit))}
        >
          이전
        </Button>
        <Button
          disabled={(searchParams.skip || 0) + searchParams.limit >= total}
          onClick={() => updateSearchParams("skip", (searchParams.skip || 0) + searchParams.limit)}
        >
          다음
        </Button>
      </div>
    </div>
  )
}

export default Pagination
