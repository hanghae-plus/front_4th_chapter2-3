import { Button, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared"
import { usePagination } from "../model/use-pagination"

interface PostListPaginationProps {
  total: number
}

function PostListPagination(props: PostListPaginationProps) {
  const { total } = props
  const { skip, limit, handleSkipChange, handleLimitChange } = usePagination({ initialTotal: total })

  return (
    <div className="flex justify-between items-center w-full">
      <div className="flex items-center gap-2">
        <span>표시</span>
        <Select value={limit.toString()} onValueChange={(value) => handleLimitChange(Number(value))}>
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
        <Button disabled={skip === 0} onClick={() => handleSkipChange(skip - limit)}>
          이전
        </Button>
        <Button disabled={skip + limit >= total} onClick={() => handleSkipChange(skip + limit)}>
          다음
        </Button>
      </div>
    </div>
  )
}

export { PostListPagination }
