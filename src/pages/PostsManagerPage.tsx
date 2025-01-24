import { useEffect, useState } from "react"
import { Plus } from "lucide-react"
import { Button, Card, CardContent, CardHeader, CardTitle } from "../shared/ui"
import { useLoadingStore } from "../shared/model/useLoadingStore"
import { PostTable } from "../features/post/ui/PostTable"
import { UserInfoDialog } from "../entities/user/ui/UserInfoDialog"
import { PostDetailDialog } from "../features/post/ui/PostDetailDialog"
import { CommentEditDialog } from "../features/comment/ui/CommentEditDialog"
import { CommentAddDialog } from "../features/comment/ui/CommentAddDialog"
import { PostEditDialog } from "../features/post/ui/PostEditDialog"
import { PostAddDialog } from "../features/post/ui/PostAddDialog"
import { Pagination } from "../shared/ui/Pagination"
import { SearchAndFilter } from "../widgets/ui/Search"
import { usePostActions } from "../features/post/model/usePostActions"
import { usePostsFilter } from "../features/post/model/usePostFilter"
import { useDialogStore } from "../shared/model/useDialogStore"
import { Tag } from "../entities/post/model/types"

const PostsManager: React.FC = () => {
  const { isLoading } = useLoadingStore()
  const { setShowAddDialog } = useDialogStore()
  const [tags, setTags] = useState<Tag[]>([])
  const { updateURL, sortBy, sortOrder, selectedTag } = usePostsFilter()
  const { fetchPosts, fetchPostsByTag } = usePostActions()

  const fetchTags = async () => {
    try {
      const response = await fetch("/api/posts/tags")
      const data = await response.json()
      setTags(data)
      console.log("태그:", data)
    } catch (error) {
      console.error("태그 가져오기 오류:", error)
    }
  }

  useEffect(() => {
    if (selectedTag) {
      fetchPostsByTag(selectedTag)
    } else {
      fetchPosts()
    }
    updateURL()
  }, [sortBy, sortOrder, selectedTag])

  useEffect(() => {
    fetchTags()
  }, [])

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
          {/* 검색 및 필터 컨트롤 */}
          <SearchAndFilter tags={tags} />

          {/* 게시물 테이블 */}
          {isLoading ? <div className="flex justify-center p-4">로딩 중...</div> : <PostTable />}

          {/* 페이지네이션 */}
          <Pagination />
        </div>
      </CardContent>

      {/* 게시물 추가 대화상자 */}
      <PostAddDialog />

      {/* 게시물 수정 대화상자 */}
      <PostEditDialog />

      {/* 댓글 추가 대화상자 */}
      <CommentAddDialog />

      {/* 댓글 수정 대화상자 */}
      <CommentEditDialog />

      <PostDetailDialog />

      <UserInfoDialog />
    </Card>
  )
}

export default PostsManager
