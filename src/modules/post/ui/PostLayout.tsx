import { CardContent } from "../../../shared/ui"
import SearchInput from "../../../features/search/ui/SearchInput.tsx"
import SelectTag from "../../../features/tag/ui/SelectTag.tsx"
import SelectSort from "../../../features/sort/ui/SelectSort.tsx"
import SelectSortBy from "../../../features/sort/ui/SelectSortBy.tsx"
import RenderPostTable from "../../../features/posts/ui/RenderPostTable.tsx"
import Pagination from "./Pagination.tsx"

export default function PostLayout({children}) {
  return (
    <CardContent>
      <CardContent>
        <div className="flex flex-col gap-4">
          {/* 검색 및 필터 컨트롤 */}
          <div className="flex gap-4">
            <SearchInput />
            <SelectTag />
            <SelectSort />
            <SelectSortBy />
          </div>
          
          {/* 게시물 테이블 */}
          {children}
          
          {/* 페이지네이션 */}
          <Pagination />
        </div>
      </CardContent>
    </CardContent>
  )
}