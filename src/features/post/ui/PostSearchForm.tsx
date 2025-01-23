import { Search } from "lucide-react"
import { useState } from "react"

import { usePageParamActions } from "../../../entities/tag/model/store/PageParamProvider"
import { Input } from "../../../shared/ui"

export const PostSearchForm = () => {
  const [query, setQuery] = useState("")

  const actions = usePageParamActions()

  const searchPosts = () => {
    actions.setSearchQuery(query)
  }

  return (
    <div className="flex-1">
      <div className="relative">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="게시물 검색..."
          className="pl-8"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && searchPosts()}
        />
      </div>
    </div>
  )
}
