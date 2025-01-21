import { Search } from 'lucide-react'
import { Input } from '../../shared/ui'
import { useSearchParam } from '../hooks/useQueryParams'
import { useGetPostListBySearch } from '../queries/post.query'

export const SearchPostInput = () => {
  const [searchQuery, setSearchQuery] = useSearchParam()
  const { refetch: reFetchSearchPosts } = useGetPostListBySearch(searchQuery)

  return (
    <div className="flex-1  ">
      <div className="relative">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="게시물 검색..."
          className="pl-8"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && reFetchSearchPosts()}
        />
      </div>
    </div>
  )
}
