import { AddPostButton } from "../../../features/addComment/ui"
import { SearchPostBar } from "../../../features/serchPost/ui"
import { PostsWithUsersTable } from "../../../features/postsWithUsers/ui"
import { Pagination } from "../../../features/pagination/ui"
import { AddPostDialog } from "../../../features/addPost/ui"
import { UpdatePostDialog } from "../../../features/updatePost/ui"
import { PostDetailDialog } from "../../../features/postDetail/ui"
import { AddCommentDialog } from "../../../features/addComment/ui"
import { UpdateCommentDialog } from "../../../features/updateComment/ui"
import { UserDialog } from "../../../entities/user/ui"
import { CardContainer, CardContent, CardHeader, CardTitle } from "../../../shared/ui/card"

export const PostsManagerWidget = () => {
  return (
    <>
      <CardContainer className="w-full max-w-6xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>게시물 관리자</span>
            <AddPostButton />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <SearchPostBar />
            <PostsWithUsersTable />
            <Pagination />
          </div>
        </CardContent>
      </CardContainer>
      {/* Dialog */}
      <AddPostDialog />
      <UpdatePostDialog />
      <PostDetailDialog />
      <AddCommentDialog />
      <UpdateCommentDialog />
      <UserDialog />
    </>
  )
}
