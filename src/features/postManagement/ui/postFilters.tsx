import { usePostStore } from "../../../entities/post/model/store";
import { Select, Input } from "../../../shared/ui";
import { Search } from "lucide-react";

export const PostFilters = () => {
  const { filters, setFilters } = usePostStore();
  const tags = [];

  return (
    <div className="flex gap-4">
      <div className="flex-1 relative">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="게시물 검색..."
          className="pl-8"
          value={filters.search}
          onChange={(e) => setFilters({ search: e.target.value })}
        />
      </div>
      <Select
        value={filters.tag}
        onValueChange={(value) => setFilters({ tag: value })}
      >
        <Select.Trigger className="w-[180px]">
          <Select.Value placeholder="태그 선택" />
        </Select.Trigger>
        <Select.Content>
          <Select.Item value="all">모든 태그</Select.Item>
          {tags.map((tag) => (
            <Select.Item key={tag.slug} value={tag.slug}>
              {tag.slug}
            </Select.Item>
          ))}
        </Select.Content>
      </Select>
    </div>
  );
};