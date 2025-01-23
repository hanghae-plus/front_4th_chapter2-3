import { usePostQuery, usePostStore } from "@features/post";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@radix-ui/react-select";
import { Button } from "@shared/ui";

const PaginationBar = () => {
  const { limit, skip, updatePostSearchParams } = usePostQuery();
  const { total } = usePostStore();

  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-2">
        <span>표시</span>
        <Select
          value={limit.toString()}
          onValueChange={(value) => {
            updatePostSearchParams("limit", value);
          }}
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
          disabled={skip === 0}
          onClick={() => updatePostSearchParams("sortBy", Math.max(0, skip - limit).toString())}
        >
          이전
        </Button>
        <Button
          disabled={skip + limit >= total}
          onClick={() => updatePostSearchParams("skip", (skip + limit).toString())}
        >
          다음
        </Button>
      </div>
    </div>
  );
};

export default PaginationBar;
