import { Pagination } from "@/features/post/ui/Pagination"
import { PostsTable } from "@/features/post/ui/PostsTable"
import { SearchController } from "@/features/post/ui/SearchController"
import { CardContent } from "@/shared/ui/card"
import { Suspense } from "react"

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
