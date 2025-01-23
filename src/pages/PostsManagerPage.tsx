import { Card, CardContent, CardHeader, CardTitle } from "../shared/ui"
import { PostsFilter } from "../components/posts/PostsFilter"
import { PostsTable } from "../components/posts/PostsTable"
import { PostsPagination } from "../components/posts/PostsPagination"
import { PostDetailDialog } from "../components/posts/PostDetailDialog"
import { PostEditDialog } from "../components/posts/PostEditDialog"
import { CommentEditDialog } from "../components/posts/CommentEditDialog"
import { UserDetailDialog } from "../components/posts/UserDetailDialog"
import { usePostsStore } from "../stores/usePostsStore"
import { useEffect } from "react"

const PostsManagerPage = () => {
  const { loading, fetchPosts } = usePostsStore()

  useEffect(() => {
    fetchPosts(0, 10)
  }, [])

  return (
    <Card className="w-full max-w-6xl mx-auto">
      <CardHeader>
        <CardTitle>게시물 관리자</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <PostsFilter />
          {loading ? <div className="flex justify-center p-4">로딩 중...</div> : <PostsTable />}
          <PostsPagination />
        </div>
        <PostDetailDialog />
        <PostEditDialog />
        <CommentEditDialog />
        <UserDetailDialog />
      </CardContent>
    </Card>
  )
}

export default PostsManagerPage
