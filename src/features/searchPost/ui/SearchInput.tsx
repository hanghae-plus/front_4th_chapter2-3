import { useEffect } from "react"
import { useAtom, useSetAtom } from "jotai"
import { Search } from "lucide-react"
import { searchQueryAtom } from "@features/searchPost/model"
import { postsWithUsersAtom } from "@features/postsWithUsers/model"
import { usePostsBySearchQuery } from "@features/searchPost/api"
import { Input } from "@shared/ui/common"

export const SearchInput = () => {
  const setPosts = useSetAtom(postsWithUsersAtom)

  const [searchQuery, setSearchQuery] = useAtom(searchQueryAtom)

  const { data: postsBySearchQuery, isLoading: isPostsBySearchQueryLoading } = usePostsBySearchQuery(searchQuery)

  useEffect(() => {
    if (!isPostsBySearchQueryLoading && postsBySearchQuery) {
      setPosts(postsBySearchQuery.posts || [])
    }
  }, [isPostsBySearchQueryLoading])

  return (
    <div className="relative">
      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder="게시물 검색..."
        className="pl-8"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyPress={(e) => e.key === "Enter"}
      />
    </div>
  )
}
