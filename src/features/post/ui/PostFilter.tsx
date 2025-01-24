import {
  Input,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../../../shared/ui";
import { Search } from "lucide-react";
import { useAtom } from "jotai";
import {
  searchQueryAtom,
  selectedTagAtom,
  sortByAtom,
  sortOrderAtom,
  tagsAtom,
} from "../../../app/store/atom";
import { usePosts } from "../../../entities/post/hook/usePosts";
import { useTags } from "../../../entities/tag/hook/useTags";

export const PostFilter: React.FC = () => {
  const [SearchQuery, setSearchQuery] = useAtom<string>(searchQueryAtom);
  const [selectedTag] = useAtom(selectedTagAtom);
  const [sortBy, setSortBy] = useAtom(sortByAtom);
  const [sortOrder, setSortOrder] = useAtom(sortOrderAtom);
  const [tags] = useAtom(tagsAtom);

  const { handleSearchPost } = usePosts();
  const { handleControlFilter } = useTags();

  return (
    <div className="flex gap-4">
      <div className="flex-1">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="게시물 검색..."
            className="pl-8"
            value={SearchQuery}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSearchQuery(e.target.value)
            }
            onKeyDown={(e) => e.key === "Enter" && handleSearchPost()}
          />
        </div>
      </div>
      <Select
        value={selectedTag}
        onValueChange={(value) => handleControlFilter(value)}
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
        onValueChange={setSortBy}
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
        onValueChange={setSortOrder}
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
