import { usePostStore } from "../../../entities/post/model/store";
import { Input } from "../../../shared/ui";
import { Select } from "../../../shared/ui/select/Select";
import { Search } from "lucide-react";
import { Tag } from "../../../shared/ui/select/Select.types";
import { useEffect, useState } from "react";

export const PostFilters = () => {
  const { filters, setFilters } = usePostStore();
  const [tags, setTags] = useState<Tag[]>([]);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await fetch("/api/posts/tags");
        const data = await response.json();
        setTags(data);
      } catch (error) {
        console.error("태그 가져오기 오류:", error);
      }
    };

    fetchTags();
  }, []);

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
            <Select.Item key={tag.url} value={tag.slug}>
              {tag.slug}
            </Select.Item>
          ))}
        </Select.Content>
      </Select>
    </div>
  );
};