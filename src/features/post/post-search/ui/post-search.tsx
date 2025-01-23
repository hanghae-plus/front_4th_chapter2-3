import { Input } from "@/shared"
import { useSearchParams } from "@/shared/hooks/use-search-params"
import { Search } from "lucide-react"

export function PostSearch() {
  const { getParam, setParam } = useSearchParams()

  return (
    <div className="flex-1">
      <div className="relative">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="게시물 검색..."
          className="pl-8"
          value={getParam("search") || ""}
          onChange={(e) => setParam("search", e.target.value)}
        />
      </div>
    </div>
  )
}
