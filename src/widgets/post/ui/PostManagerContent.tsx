import { SearchController } from "@features/post/ui/SearchController.tsx"
import { Suspense } from "react"
import { PostsTable } from "@features/post/ui"
import { Pagination } from "@widgets/ui"
import { CardContent, Loading } from "@shared/ui"

export function PostManagerContent() {
  return (
    <CardContent>
      <div className="flex flex-col gap-4">
        <SearchController />
        <Suspense fallback={<Loading />}>
          <PostsTable />
        </Suspense>
        <Pagination />
      </div>
    </CardContent>
  )
}
