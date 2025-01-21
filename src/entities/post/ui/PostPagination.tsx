import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Button,
} from "../../../shared/ui";

interface PostPaginationProps {
  limit: number;
  skip: number;
  total: number;
  onClickPage: (page: number) => void;
  onValueChange: (value: number) => void;
}

export const PostPagination: React.FC<PostPaginationProps> = ({
  limit,
  onValueChange,
  skip,
  onClickPage,
  total,
}) => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-2">
        <span>표시</span>
        <Select
          value={limit.toString()}
          onValueChange={(value) => onValueChange(Number(value))}
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
          onClick={() => onClickPage(Math.max(0, skip - limit))}
        >
          이전
        </Button>
        <Button
          disabled={skip + limit >= total}
          onClick={() => onClickPage(skip + limit)}
        >
          다음
        </Button>
      </div>
    </div>
  );
};
