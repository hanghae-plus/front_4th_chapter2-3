import { useState } from "react"

import { PostsManagerWidget, PostDetailDialog, PostFormDialog } from "@widgets/post/ui"
import { CommentFormDialog } from "@widgets/comment/ui"
import { UserInfoDialog } from "@widgets/user/ui"

import { usePostManager } from "@features/post/model/hooks"
import { useCommentManager } from "@features/comment/model/hooks"
import { useUserManager } from "@features/user/model/hooks"

const PostsManager = () => {
  const {
    newPost,
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
    setSelectedPost,
    addPost,
    updatePost,
    deletePost,
    setSearchQuery,
    searchPosts,
    setSelectedTag,
    setSortBy,
    setSortOrder,
    setLimit,
    setSkip,
    setNewPostTitle,
    setNewPostBody,
    setShowPostDetailDialog,
    openPostDetail,
  } = usePostManager()

  const {
    comments,
    newComment,
    selectedComment,
    showAddCommentDialog,
    showEditCommentDialog,
    addComment,
    updateComment,
    deleteComment,
    likeComment,
    handleAddComment,
    handleEditComment,
    setShowAddCommentDialog,
    setShowEditCommentDialog,
    setSelectedComment,
    setNewCommentBody,
  } = useCommentManager()

  const { selectedUser, showUserModal, handleUserClick, setShowUserModal } = useUserManager()

  const [showAddDialog, setShowAddDialog] = useState(false)
  const [showEditDialog, setShowEditDialog] = useState(false)

  return (
    <>
      <PostsManagerWidget
        loading={loading}
        posts={posts}
        total={total}
        skip={skip}
        limit={limit}
        searchQuery={searchQuery}
        selectedTag={selectedTag}
        tags={tags}
        sortBy={sortBy}
        sortOrder={sortOrder}
        onAddClick={() => setShowAddDialog(true)}
        onEditPost={(post) => {
          setSelectedPost(post)
          setShowEditDialog(true)
        }}
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
        comments={selectedPost ? comments[selectedPost.id] || [] : []}
        onAddComment={() => handleAddComment(selectedPost?.id || 0)}
        onEditComment={handleEditComment}
        onDeleteComment={deleteComment}
        onLikeComment={likeComment}
      />

      <PostFormDialog
        mode="add"
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
        post={{ ...newPost, id: 0 }}
        onTitleChange={setNewPostTitle}
        onBodyChange={setNewPostBody}
        onSubmit={() => addPost(newPost)}
      />

      <PostFormDialog
        mode="edit"
        open={showEditDialog}
        onOpenChange={setShowEditDialog}
        post={selectedPost}
        onTitleChange={(title) => setSelectedPost(selectedPost ? { ...selectedPost, title } : null)}
        onBodyChange={(body) => setSelectedPost(selectedPost ? { ...selectedPost, body } : null)}
        onSubmit={() => selectedPost && updatePost(selectedPost)}
      />

      <CommentFormDialog
        mode="add"
        open={showAddCommentDialog}
        onOpenChange={setShowAddCommentDialog}
        comment={{ id: 0, body: newComment.body, postId: newComment.postId ?? 0, userId: newComment.userId }}
        onBodyChange={setNewCommentBody}
        onSubmit={addComment}
      />

      <CommentFormDialog
        mode="edit"
        open={showEditCommentDialog}
        onOpenChange={setShowEditCommentDialog}
        comment={selectedComment}
        onBodyChange={(body) => setSelectedComment(selectedComment ? { ...selectedComment, body } : null)}
        onSubmit={() => selectedComment && updateComment()}
      />

      <UserInfoDialog />
    </>
  )
}

export default PostsManager
