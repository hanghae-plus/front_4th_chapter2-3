import { Search } from "lucide-react";
import { Input } from "@shared/input/ui";
import { usePostSearch } from "@features/posts/model/usePostSearch.ts";
import { usePostStore } from "@core/store/usePostStore.ts";

function PostSearch() {
  const { handleSearchQueryChange, handleKeyPress } = usePostSearch();
  const { filters } = usePostStore();
  return (
    <div className="flex-1">
      <div className="relative">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="게시물 검색..."
          className="pl-8"
          value={filters.searchQuery}
          onChange={handleSearchQueryChange}
          onKeyPress={handleKeyPress}
        />
      </div>
    </div>
  );
}

export default PostSearch;
