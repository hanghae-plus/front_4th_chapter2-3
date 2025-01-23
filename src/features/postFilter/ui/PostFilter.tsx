import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@shared/select/ui";
import { usePostFilter } from "@features/postFilter/model/usePostFilter.ts";
import { useTagStore } from "@core/store/useTagStore.ts";
import { usePostStore } from "@core/store/usePostStore.ts";
import PostSearch from "@features/post-search/ui/PostSearch.tsx";

function PostFilter() {
  const { filters } = usePostStore();
  const { handleSortChange, handleTagSelect } = usePostFilter();
  const { tags } = useTagStore();

  return (
    <>
      검색 및 필터 컨트롤
      <div className="flex gap-4">
        <PostSearch />
        <Select value={filters.selectedTag} onValueChange={(tag) => handleTagSelect(tag)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="태그 선택" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">모든 태그</SelectItem>
            {tags.map((tag) => (
              <SelectItem key={tag.url} value={tag.slug}>
                {tag.slug}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={filters.sortBy} onValueChange={(sortBy) => handleSortChange(sortBy, filters.sortOrder)}>
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
          value={filters.sortOrder}
          onValueChange={(sortOrder: "asc" | "desc") => handleSortChange(filters.sortBy, sortOrder)}
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
    </>
  );
}

export default PostFilter;
