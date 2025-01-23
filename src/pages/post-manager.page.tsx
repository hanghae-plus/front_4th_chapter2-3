import { Card, CardContent, CardHeader, CardTitle } from "@/shared"
import { PostAddDialog } from "@/widgets/posts/post-add"
import { PostFilterSearch } from "@/widgets/posts/post-filter-search"
import { PostsTable } from "@/widgets/posts/posts-table"

const PostsManager = () => {
  return (
    <Card className="w-full max-w-6xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>게시물 관리자</span>
          <PostAddDialog />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <PostFilterSearch />
          <PostsTable />
        </div>
      </CardContent>
    </Card>
  )
}

export default PostsManager
