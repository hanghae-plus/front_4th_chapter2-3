import { Button, Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "../../../shared/ui"

interface PaginationProps {
  page: number
  pageSize: number
  total: number
  onPageChange: (page: number) => void
  onPageSizeChange: (pageSize: number) => void
}

export const Pagination = ({ page, pageSize, total, onPageChange, onPageSizeChange }: PaginationProps) => (
  <div className="flex justify-between items-center">
    <div className="flex items-center gap-2">
      <span>표시</span>
      <Select value={pageSize.toString()} onValueChange={(value) => onPageSizeChange(Number(value))}>
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
      <Button disabled={page === 0} onClick={() => onPageChange(page - 1)}>
        이전
      </Button>
      <Button disabled={(page + 1) * pageSize >= total} onClick={() => onPageChange(page + 1)}>
        다음
      </Button>
    </div>
  </div>
)
