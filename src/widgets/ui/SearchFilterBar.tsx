import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Input } from "@shared/ui";
import { usePostQuery } from "@features/post";
import { useTagQuery } from "@features/tag";
import { Search } from "lucide-react";

const SearchFilterBar = () => {
  const { searchQuery, selectedTag, sortBy, sortOrder, updatePostSearchParams } = usePostQuery();

  const { data: tags } = useTagQuery();

  const searchPosts = async (searchQuery: string) => {
    updatePostSearchParams("searchQuery", searchQuery);
  };

  const fetchPostsByTag = async (tag: string) => {
    if (tag === "all") {
      updatePostSearchParams("selectedTag", "");
      return;
    }
    updatePostSearchParams("selectedTag", tag);
  };

  return (
    <div className="flex gap-4">
      <div className="flex-1">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="게시물 검색..."
            className="pl-8"
            defaultValue={searchQuery}
            onKeyPress={(e) => e.key === "Enter" && searchPosts(e.target.value)}
          />
        </div>
      </div>
      <Select
        value={selectedTag}
        onValueChange={(value: string) => {
          fetchPostsByTag(value);
        }}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="태그 선택" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">모든 태그</SelectItem>
          {tags?.map((tag: Tag) => (
            <SelectItem key={tag.url} value={tag.slug}>
              {tag.slug}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select value={sortBy} onValueChange={(value) => updatePostSearchParams("sortBy", value)}>
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
      <Select value={sortOrder} onValueChange={(value) => updatePostSearchParams("sortOrder", value)}>
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

export default SearchFilterBar;
