import { useState } from "react"
import { Plus } from "lucide-react"
import { Button, Card, CardContent, CardHeader, CardTitle } from "../../shared/ui"
import { Post } from "../../entities/post/model/types"
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
import { useCommentStore } from "@/features/comment/model/store"

const PostsManager = () => {
  // 상태 관리
  const [showPostDetailDialog, setShowPostDetailDialog] = useState(false)

  // 전역 상태 관리
  const {
    total,
    loading,
    selectedPost,
    fetchPostsByTag,
    searchPosts,
    setShowAddDialog,
    deletePost,
    setSelectedPost,
    setShowEditDialog,
  } = usePostStore()

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

  const {
    comments,
    fetchComments,
    deleteComment,
    likeComment,
    setShowAddCommentDialog,
    setShowEditCommentDialog,
    setNewComment,
    setSelectedComment,
  } = useCommentStore()

  // 게시물 상세 보기
  const openPostDetail = (post: Post) => {
    setSelectedPost(post)
    fetchComments(post.id)
    setShowPostDetailDialog(true)
  }

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

          {loading ? (
            <div className="flex justify-center p-4">로딩 중...</div>
          ) : (
            <PostTable
              searchQuery={searchQuery}
              selectedTag={selectedTag}
              setSelectedTag={setSelectedTag}
              updateURL={updateURL}
              // openUserModal={openUserModal}
              openPostDetail={openPostDetail}
              setSelectedPost={setSelectedPost}
              setShowEditDialog={setShowEditDialog}
              deletePost={deletePost}
            />
          )}

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
      <PostDetailDialog
        open={showPostDetailDialog}
        onOpenChange={setShowPostDetailDialog}
        postId={selectedPost?.id || 0}
        selectedPost={selectedPost!}
        comments={comments}
        searchQuery={searchQuery}
        setSelectedComment={setSelectedComment}
        likeComment={likeComment}
        deleteComment={deleteComment}
        setShowEditCommentDialog={setShowEditCommentDialog}
        setNewComment={setNewComment}
        setShowAddCommentDialog={setShowAddCommentDialog}
      />

      {/* 사용자 모달 */}
      <UserDialog />
    </Card>
  )
}

export default PostsManager
