import { Search } from "lucide-react";
import { Input } from "@shared/input/ui";

interface PostSearchProps {
  searchQuery: string;
  handleSearchQueryChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

function PostSearch({ searchQuery, handleSearchQueryChange, handleKeyPress }: PostSearchProps) {
  return (
    <div className="flex-1">
      <div className="relative">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="게시물 검색..."
          className="pl-8"
          value={searchQuery}
          onChange={handleSearchQueryChange}
          onKeyPress={handleKeyPress}
        />
      </div>
    </div>
  );
}

export default PostSearch;
