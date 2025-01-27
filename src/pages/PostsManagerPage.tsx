import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card"
import { Button } from "@/shared/ui/"
import { Plus } from "lucide-react"
import { PostsFilter } from "@/features/post-management/ui/PostsFilter"
import { PostsTable } from "@/entities/post/ui/PostsTable"
import { PostsPagination } from "@/features/post-management/ui/PostsPagination"
import { PostDetailDialog } from "@/features/post-management/ui/PostDetailDialog"
import { PostEditDialog } from "@/features/post-management/ui/PostEditDialog"
import { CommentEditDialog } from "@/features/post-management/ui/CommentEditDialog"
import { UserDetailDialog } from "@/entities/user/ui/UserDetailDialog"
import { AddPostDialog } from "@/features/posts/ui/AddPostDialog"
import { usePostsStore } from "@/entities/post/model/postsStore"
import { PostComments } from "@/entities/comment/ui/PostComments"

const PostsManagerPage = () => {
  const { loading, total, fetchPosts } = usePostsStore()
  const [skip, setSkip] = useState(0)
  const [limit, setLimit] = useState(10)
  const [showAddDialog, setShowAddDialog] = useState(false)

  useEffect(() => {
    fetchPosts(skip, limit)
  }, [skip, limit])

  return (
    <Card className="w-full max-w-6xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>게시물 관리자</span>
          <Button onClick={() => setShowAddDialog(true)}>
            <Plus className="w-4 h-4 mr-2" />
            게시물 추가
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <PostsFilter />
          {loading ? <div className="flex justify-center p-4">로딩 중...</div> : <PostsTable />}
          <PostsPagination
            total={total}
            skip={skip}
            limit={limit}
            onLimitChange={(newLimit: number) => {
              setLimit(newLimit)
              fetchPosts(skip, newLimit)
            }}
            onSkipChange={(newSkip: number) => {
              setSkip(newSkip)
              fetchPosts(newSkip, limit)
            }}
          />
        </div>
        <AddPostDialog open={showAddDialog} onOpenChange={setShowAddDialog} />
        <PostDetailDialog />
        <PostEditDialog />
        <CommentEditDialog />
        <UserDetailDialog />
      </CardContent>
    </Card>
  )
}

export default PostsManagerPage
