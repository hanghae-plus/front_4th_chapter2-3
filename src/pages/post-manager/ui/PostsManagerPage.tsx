import { Card, CardContent } from "../../../shared/ui"
import { usePostStore } from "@/features/post/model/store"
import { PostTable } from "@/widgets/post/ui/PostTable"
import { PostPagination } from "@/widgets/post/ui/PostPagination"
import { PostTableFilter } from "@/widgets/post/ui/PostTableFilter"
import { PostAddDialog } from "@/widgets/post/ui/PostAddDialog"
import { PostEditDialog } from "@/widgets/post/ui/PostEditDialog"
import { CommentAddDialog } from "@/widgets/comment/ui/CommentAddDialog"
import { CommentEditDialog } from "@/widgets/comment/ui/CommentEditDialog"
import { PostDetailDialog } from "@/widgets/post/ui/PostDetailDialog"
import { UserDialog } from "@/widgets/user/ui/UserDialog"
import { PostsManagerHeader } from "./PostsManagerHeader"
import { usePostManager } from "../model/hooks"

const PostsManager = () => {
  usePostManager()
  const { loading } = usePostStore()

  const Dialogs = () => (
    <>
      <PostAddDialog />
      <PostEditDialog />
      <CommentAddDialog />
      <CommentEditDialog />
      <PostDetailDialog />
      <UserDialog />
    </>
  )

  return (
    <Card className="w-full max-w-6xl mx-auto">
      <PostsManagerHeader />
      <CardContent>
        <div className="flex flex-col gap-4">
          <PostTableFilter />
          {loading ? <div className="flex justify-center p-4">로딩 중...</div> : <PostTable />}
          <PostPagination />
        </div>
      </CardContent>
      <Dialogs />
    </Card>
  )
}

export default PostsManager
