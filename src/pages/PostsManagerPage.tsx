import { PostsManagerWidget, PostDetailDialog, PostFormDialog } from "@widgets/post/ui"
import { CommentFormDialog } from "@widgets/comment/ui"
import { UserInfoDialog } from "@widgets/user/ui"

import { usePostManager } from "@features/post/model/hooks"
import { useCommentManager } from "@features/comment/model/hooks"
import { useUserManager } from "@features/user/model/hooks"

const PostsManager = () => {
  const {
    posts,
    total,
    skip,
    limit,
    searchQuery,
    selectedTag,
    tags,
    sortBy,
    sortOrder,
    loading,
    selectedPost,
    showPostDetailDialog,
    deletePost,
    setSearchQuery,
    searchPosts,
    setSelectedTag,
    setSortBy,
    setSortOrder,
    setLimit,
    setSkip,
    setShowPostDetailDialog,
    openPostDetail,
    handleAddPost,
    handleEditPost,
  } = usePostManager()

  const { comments, deleteComment, likeComment, handleAddComment, handleEditComment } = useCommentManager(
    selectedPost?.id || 0,
  )

  const { handleUserClick } = useUserManager()

  return (
    <>
      <PostsManagerWidget
        loading={loading}
        posts={posts || []}
        total={total}
        skip={skip}
        limit={limit}
        searchQuery={searchQuery}
        selectedTag={selectedTag}
        tags={tags || []}
        sortBy={sortBy}
        sortOrder={sortOrder}
        onAddClick={handleAddPost}
        onEditPost={handleEditPost}
        onDeletePost={deletePost}
        onViewComments={openPostDetail}
        onUserClick={handleUserClick}
        onSearchChange={setSearchQuery}
        onSearch={searchPosts}
        onTagChange={setSelectedTag}
        onSortByChange={setSortBy}
        onSortOrderChange={(value) => setSortOrder(value as "asc" | "desc")}
        onLimitChange={setLimit}
        onPrevPage={() => setSkip(Math.max(0, skip - limit))}
        onNextPage={() => setSkip(skip + limit)}
      />

      <PostDetailDialog
        open={showPostDetailDialog}
        onOpenChange={setShowPostDetailDialog}
        post={selectedPost}
        comments={selectedPost ? comments || [] : []}
        onAddComment={() => handleAddComment(selectedPost?.id || 0)}
        onEditComment={handleEditComment}
        onDeleteComment={deleteComment}
        onLikeComment={likeComment}
      />

      <PostFormDialog mode="add" />
      <PostFormDialog mode="edit" />
      <CommentFormDialog mode="add" />
      <CommentFormDialog mode="edit" />
      <UserInfoDialog />
    </>
  )
}

export default PostsManager
