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
import { usePostUrl } from "@/features/post/post-url/model"
import { PostsManagerHeader } from "./PostsManagerHeader"

const PostsManager = () => {
  // 전역 상태 관리
  const { total, loading, fetchPostsByTag, searchPosts } = usePostStore()

  const {
    skip,
    limit,
    searchQuery,
    sortBy,
    sortOrder,
    selectedTag,
    setSkip,
    setLimit,
    setSearchQuery,
    setSortBy,
    setSortOrder,
    setSelectedTag,
    updateURL,
  } = usePostUrl()

  return (
    <Card className="w-full max-w-6xl mx-auto">
      <PostsManagerHeader />
      <CardContent>
        <div className="flex flex-col gap-4">
          <PostTableFilter
            searchQuery={searchQuery}
            selectedTag={selectedTag}
            sortBy={sortBy}
            sortOrder={sortOrder}
            setSearchQuery={setSearchQuery}
            searchPosts={searchPosts}
            setSelectedTag={setSelectedTag}
            fetchPostsByTag={fetchPostsByTag}
            setSortBy={setSortBy}
            setSortOrder={setSortOrder}
            updateURL={updateURL}
          />

          {loading ? <div className="flex justify-center p-4">로딩 중...</div> : <PostTable />}

          <PostPagination limit={limit} skip={skip} total={total} setLimit={setLimit} setSkip={setSkip} />
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

      {/* 게시물 상세 보기 대화상자 */}
      <PostDetailDialog />

      {/* 사용자 모달 */}
      <UserDialog />
    </Card>
  )
}

export default PostsManager
