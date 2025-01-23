import { useSetAtom } from "jotai"
import { Plus } from "lucide-react"

import { useSetSearchParam } from "../features/serchPost/lib"
import { PostsWithUsersTable } from "../features/postsWithUsers/ui"
import { AddPostDialog } from "../features/addPost/ui"
import { PostDetailDialog } from "../features/postDetail/ui"
import { UpdatePostDialog } from "../features/updatePost/ui"
import { AddCommentDialog } from "../features/addComment/ui"
import { UpdateCommentDialog } from "../features/updateComment/ui"
import { Pagination } from "../features/pagination/ui"
import { SearchPost } from "../features/serchPost/ui"
import { UserDialog } from "../entities/user/ui"
import { dialogAtomFamily } from "../shared/model"
import { Button } from "../shared/ui/common"
import { CardContainer, CardContent, CardHeader, CardTitle } from "../shared/ui/card"

const PostsManager = () => {
  const setShowAddDialog = useSetAtom(dialogAtomFamily("add-post"))

  const { updateURL } = useSetSearchParam()

  return (
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
          {/* 검색 및 필터 컨트롤 */}
          <SearchPost
            {...{
              updateURL,
            }}
          />

          {/* 게시물 테이블 */}
          <PostsWithUsersTable
            {...{
              updateURL,
            }}
          />

          {/* 페이지네이션 */}
          <Pagination />
        </div>
      </CardContent>

      {/* 게시물 추가 대화상자 */}
      <AddPostDialog />

      {/* 게시물 수정 대화상자 */}
      <UpdatePostDialog />

      {/* 게시물 상세 보기 대화상자 */}
      <PostDetailDialog />

      {/* 댓글 추가 대화상자 */}
      <AddCommentDialog />

      {/* 댓글 수정 대화상자 */}
      <UpdateCommentDialog />

      {/* 사용자 정보 모달 */}
      <UserDialog />
    </CardContainer>
  )
}

export default PostsManager
