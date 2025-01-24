import { Search } from "lucide-react";
import { Input } from "@shared/input/ui";
import { usePostSearch } from "@features/posts/model/usePostSearch.ts";

function PostSearch() {
  const { searchQuery, handleSearchQueryChange, handleKeyPress } = usePostSearch();

  return (
    <div className="flex-1">
      <div className="relative">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="게시물 검색..."
          className="pl-8"
          value={searchQuery ?? ""}
          onChange={handleSearchQueryChange}
          onKeyPress={handleKeyPress}
        />
      </div>
    </div>
  );
}

export default PostSearch;
