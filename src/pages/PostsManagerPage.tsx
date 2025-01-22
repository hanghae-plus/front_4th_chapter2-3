import { Card, CardContent, CardHeader, CardTitle } from "../shared/ui"
import { PostsFilter } from "../components/posts/PostsFilter"
import { PostsTable } from "../components/posts/PostsTable"
import { PostsPagination } from "../components/posts/PostsPagination"
import { PostDetailDialog } from "../components/posts/PostDetailDialog"
import { PostEditDialog } from "../components/posts/PostEditDialog"
import { CommentEditDialog } from "../components/posts/CommentEditDialog"
import { UserDetailDialog } from "../components/posts/UserDetailDialog"
import { usePostsData } from "../hooks/posts/usePostsData"
import { usePagination } from "../hooks/posts/usePagination"
import { usePostsFilter } from "../hooks/posts/usePostsFilter"
import { useComments } from "../hooks/posts/useComments"
import { useUsers } from "../hooks/posts/useUsers"
import { useEffect } from "react"

const PostsManagerPage = () => {
  const {
    posts,
    total,
    loading,
    selectedPost,
    showPostDetailDialog,
    showEditDialog,
    setShowPostDetailDialog,
    setShowEditDialog,
    fetchPosts,
    handlePostDetail,
    handlePostEdit,
    handlePostDelete,
    handlePostUpdate,
  } = usePostsData()

  const { skip, limit, handleSkipChange, handleLimitChange } = usePagination((skip, limit) => {
    fetchPosts(skip, limit)
  })

  const {
    searchQuery,
    sortBy,
    sortOrder,
    selectedTag,
    tags,
    handleSearchChange,
    handleSearch,
    handleTagChange,
    handleSortByChange,
    handleSortOrderChange,
  } = usePostsFilter(() => {
    fetchPosts(skip, limit)
  })

  useEffect(() => {
    fetchPosts(skip, limit)
  }, [])

  const {
    comments,
    selectedComment,
    showEditCommentDialog,
    setShowEditCommentDialog,
    handleCommentLike,
    handleCommentEdit,
    handleCommentDelete,
    handleCommentUpdate,
  } = useComments()

  const { selectedUser, showUserModal, setShowUserModal, handleUserDetail } = useUsers()

  return (
    <Card className="w-full max-w-6xl mx-auto">
      <CardHeader>
        <CardTitle>게시물 관리자</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <PostsFilter
            searchQuery={searchQuery}
            onSearchChange={handleSearchChange}
            onSearch={handleSearch}
            selectedTag={selectedTag}
            onTagChange={handleTagChange}
            tags={tags}
            sortBy={sortBy}
            onSortByChange={handleSortByChange}
            sortOrder={sortOrder}
            onSortOrderChange={handleSortOrderChange}
          />

          {loading ? (
            <div className="flex justify-center p-4">로딩 중...</div>
          ) : (
            <PostsTable
              posts={posts}
              searchQuery={searchQuery}
              selectedTag={selectedTag}
              onTagSelect={handleTagChange}
              onPostDetail={handlePostDetail}
              onPostEdit={handlePostEdit}
              onPostDelete={handlePostDelete}
              onUserDetail={handleUserDetail}
            />
          )}

          <PostsPagination
            skip={skip}
            limit={limit}
            total={total}
            onSkipChange={handleSkipChange}
            onLimitChange={handleLimitChange}
          />
        </div>

        <PostDetailDialog
          open={showPostDetailDialog}
          onOpenChange={setShowPostDetailDialog}
          post={selectedPost}
          comments={comments[selectedPost?.id ?? 0] ?? []}
          onCommentLike={handleCommentLike}
          onCommentEdit={handleCommentEdit}
          onCommentDelete={handleCommentDelete}
        />

        <PostEditDialog
          open={showEditDialog}
          onOpenChange={setShowEditDialog}
          post={selectedPost}
          onUpdate={handlePostUpdate}
        />

        <CommentEditDialog
          open={showEditCommentDialog}
          onOpenChange={setShowEditCommentDialog}
          comment={selectedComment}
          onUpdate={handleCommentUpdate}
        />

        <UserDetailDialog open={showUserModal} onOpenChange={setShowUserModal} user={selectedUser} />
      </CardContent>
    </Card>
  )
}

export default PostsManagerPage
