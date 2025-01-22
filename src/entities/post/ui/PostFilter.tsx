import { Dispatch, SetStateAction } from "react";
import {
  Input,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../../../shared/ui";
import { Search } from "lucide-react";
import { Tags } from "../../tag/model/types";

interface PostFilterProps {
  searchQuery: string;
  onInputChange: (value: string) => void;
  onKeyDown: () => void;
  selectedTag: string;
  onValueChange: (value: string) => void;
  tags: Tags[];
  sortBy: string;
  onSelectChange: Dispatch<SetStateAction<string>>;
  sortOrder: string;
  onSelectOrderChange: Dispatch<SetStateAction<string>>;
}

export const PostFilter: React.FC<PostFilterProps> = ({
  searchQuery,
  onInputChange,
  onKeyDown,
  selectedTag,
  onValueChange,
  tags,
  sortBy,
  onSelectChange,
  sortOrder,
  onSelectOrderChange,
}) => {
  return (
    <div className="flex gap-4">
      <div className="flex-1">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="게시물 검색..."
            className="pl-8"
            value={searchQuery}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              onInputChange(e.target.value)
            }
            onKeyDown={(e) => e.key === "Enter" && onKeyDown()}
          />
        </div>
      </div>
      <Select
        value={selectedTag}
        onValueChange={(value) => onValueChange(value)}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="태그 선택" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">모든 태그</SelectItem>
          {tags.map((tag) => (
            <SelectItem
              key={tag.url}
              value={tag.slug}
            >
              {tag.slug}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select
        value={sortBy}
        onValueChange={onSelectChange}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="정렬 기준" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="none">없음</SelectItem>
          <SelectItem value="id">ID</SelectItem>
          <SelectItem value="title">제목</SelectItem>
          <SelectItem value="reactions">반응</SelectItem>
        </SelectContent>
      </Select>
      <Select
        value={sortOrder}
        onValueChange={onSelectOrderChange}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="정렬 순서" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="asc">오름차순</SelectItem>
          <SelectItem value="desc">내림차순</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
