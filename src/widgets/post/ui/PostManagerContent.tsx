import { SearchController } from "@features/post/ui/SearchController.tsx"
import { Suspense } from "react"
import { PostsTable } from "@features/post/ui/PostsTable.tsx"
import { Pagination } from "@features/post/ui/Pagination.tsx"
import { CardContent } from "@shared/ui"

export function PostManagerContent() {
  return (
    <CardContent>
      <div className="flex flex-col gap-4">
        <SearchController />
        <Suspense fallback={<div className="flex justify-center p-4">로딩 중...</div>}>
          <PostsTable />
        </Suspense>
        <Pagination />
      </div>
    </CardContent>
  )
}
