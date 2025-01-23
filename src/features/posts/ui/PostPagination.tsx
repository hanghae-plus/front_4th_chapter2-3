import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@shared/select/ui";
import { Button } from "@shared/button/ui";
import { usePostPagination } from "@features/posts/model/usePostPagination.ts";
import {
  calculateNextSkip,
  calculatePrevSkip,
  isFirstPage,
  isLastPage,
} from "@features/posts/lib/paginationCalculator.ts";
import { usePaginationStore } from "@core/store/usePaginationStore.ts";

function PostPagination() {
  const { pagination } = usePaginationStore();
  const { setSkip, setLimit } = usePostPagination();

  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-2">
        <span>표시</span>
        <Select value={pagination.limit.toString()} onValueChange={(value) => setLimit(Number(value))}>
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
          disabled={isFirstPage(pagination.skip)}
          onClick={() => setSkip(calculatePrevSkip(pagination.skip, pagination.limit))}
        >
          이전
        </Button>
        <Button
          disabled={isLastPage(pagination.skip, pagination.limit, pagination.total)}
          onClick={() => setSkip(calculateNextSkip(pagination.skip, pagination.limit))}
        >
          다음
        </Button>
      </div>
    </div>
  );
}

export default PostPagination;
