import { PostShowAddDialogButton } from "@/features/post/ui/PostShowAddDialogButton.tsx"
import { PostActionBar } from "@/pages/ui/PostActionBar.tsx"
import { PostPagination } from "@/pages/ui/PostPagination.tsx"
import { PostTableSection } from "@/pages/ui/PostTableSection"
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui"
import { CommentAddDialog } from "../modules/comment/ui/CommentAddDialog.tsx"
import { CommentEditDialog } from "../modules/comment/ui/CommentEditDialog.tsx"
import { PostAddDialog } from "../modules/post/ui/PostAddDialog.tsx"
import PostDetailDialog from "../modules/post/ui/PostDetailDialog.tsx"
import { PostEditDialog } from "../modules/post/ui/PostEditDialog.tsx"
import { UserDialog } from "../modules/user/ui/UserDialog.tsx"

const PostsManager = () => {
  return (
    <>
      <Card className="w-full max-w-6xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>게시물 관리자</span>
            <PostShowAddDialogButton />
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="flex flex-col gap-4">
            <PostActionBar />

            <PostTableSection />

            <PostPagination />
          </div>
        </CardContent>
      </Card>

      <UserDialog />

      <PostDetailDialog />
      <PostAddDialog />
      <PostEditDialog />

      <CommentAddDialog />
      <CommentEditDialog />
    </>
  )
}

export default PostsManager
