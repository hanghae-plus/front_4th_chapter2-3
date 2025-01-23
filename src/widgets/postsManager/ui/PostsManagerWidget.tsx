import { useSetAtom } from "jotai"
import { Plus } from "lucide-react"

import { useSetSearchParam } from "../../../features/serchPost/lib"
import { SearchPost } from "../../../features/serchPost/ui"
import { PostsWithUsersTable } from "../../../features/postsWithUsers/ui"
import { Pagination } from "../../../features/pagination/ui"
import { AddPostDialog } from "../../../features/addPost/ui"
import { UpdatePostDialog } from "../../../features/updatePost/ui"
import { PostDetailDialog } from "../../../features/postDetail/ui"
import { AddCommentDialog } from "../../../features/addComment/ui"
import { UpdateCommentDialog } from "../../../features/updateComment/ui"
import { UserDialog } from "../../../entities/user/ui"
import { dialogAtomFamily } from "../../../shared/model"
import { Button } from "../../../shared/ui/common"
import { CardContainer, CardContent, CardHeader, CardTitle } from "../../../shared/ui/card"

export const PostsManagerWidget = () => {
  const setShowAddDialog = useSetAtom(dialogAtomFamily("add-post"))

  const { updateURL } = useSetSearchParam()

  return (
    <>
      <CardContainer className="w-full max-w-6xl mx-auto">
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
            <SearchPost
              {...{
                updateURL,
              }}
            />
            <PostsWithUsersTable
              {...{
                updateURL,
              }}
            />
            <Pagination />
          </div>
        </CardContent>
      </CardContainer>
      <AddPostDialog />
      <UpdatePostDialog />
      <PostDetailDialog />
      <AddCommentDialog />
      <UpdateCommentDialog />
      <UserDialog />
    </>
  )
}
