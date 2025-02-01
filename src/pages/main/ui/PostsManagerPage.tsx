import { useMutation, useQuery } from "@tanstack/react-query"
import { Plus } from "lucide-react"
import { useMemo } from "react"
import { useSearchParams } from "react-router-dom"

import { Button, Card, CardContent, CardHeader, CardTitle, LoadingIndicator } from "../../../shared/ui"

import { Comment, useSelectedComment } from "../../../entities/comment/model"
import { postMutations, postQueries } from "../../../entities/post/api"
import { SortOrder } from "../../../entities/post/model"
import { userQueries } from "../../../entities/user/api"

import { CommentAddModal, useAddCommentModal } from "../../../features/comment/add-comment"
import { CommentEditModal, useEditCommentModal } from "../../../features/comment/edit-comment"
import { PostAddModal, useAddPostModal } from "../../../features/post/add-post"
import { PostEditModal, useEditPostModal } from "../../../features/post/edit-post"
import { PostDetailModal, useDetailPostModal } from "../../../features/post/view-post-detail"
import { UserProfileModal, useViewUserProfile } from "../../../features/user/view-user-profile"

import { commentMutations, commentQueries } from "../../../entities/comment/api"
import { CommentList } from "../../../entities/comment/ui"
import { TagFilter, useTagFilter } from "../../../features/post/filter-by-tag"
import { SearchPostForm, useSearchPost } from "../../../features/post/search-post"
import { SortControls, useSortPost } from "../../../features/post/sort-post"
import { queryClient } from "../../../shared/api"
import { usePagination } from "../../../widgets/pagination/model"
import { Pagination } from "../../../widgets/pagination/ui"
import { PostsTable } from "../../../widgets/posts-table/ui"

import { useToggleState } from "../../../shared/model/ToggleStateContext"
import { ToggleKey } from "../model"

export const PostsManagerPage = () => {
  const [searchParams] = useSearchParams()

  // 상태 관리
  const skip = parseInt(searchParams.get("skip") || "0")
  const limit = parseInt(searchParams.get("limit") || "10")
  const searchQuery = searchParams.get("search") || ""
  const sortBy = searchParams.get("sortBy") || ""
  const sortOrder = (searchParams.get("sortOrder") || "asc") as SortOrder
  const selectedTag = searchParams.get("tag") || ""

  const { page, pageSize, onPageChange, onPageSizeChange } = usePagination()

  const { resetSelectedComment } = useSelectedComment()
  const {
    searchResults,
    isLoading: isSearchLoading,
    searchPosts,
  } = useSearchPost({
    skip,
    limit,
    sortBy,
    sortOrder,
    searchQuery,
  })
  const {
    tags,
    listByTag,
    isLoading: isTagLoading,
    handleTagChange,
  } = useTagFilter({
    skip,
    limit,
    sortBy,
    sortOrder,
    selectedTag,
  })

  const { handleSortByChange, handleSortOrderChange } = useSortPost()

  const { data: list, isLoading: isListLoading } = useQuery({
    ...postQueries.listQuery({
      limit,
      skip,
      sortBy,
      order: sortOrder as SortOrder,
    }),
    select: (data) => ({
      posts: data.posts,
      total: data.total,
    }),
  })

  const { data: { users } = { users: [] } } = useQuery({
    ...userQueries.listQuery(),
    select: (data) => ({
      users: data.users,
    }),
  })

  const deletePostMutation = useMutation({
    ...postMutations.deleteMutation(),
  })

  const deleteCommentMutation = useMutation({
    ...commentMutations.deleteMutation(),
    onSuccess(_, commentId) {
      if (!selectedPost) return

      queryClient.setQueryData<{ comments: Comment[] }>(commentQueries.byPost(selectedPost.id), (prev) => {
        if (!prev) return { comments: [] }

        return {
          comments: prev.comments.filter((comment) => comment.id !== commentId),
        }
      })

      resetSelectedComment()
    },
    onError: (error) => {
      console.error("댓글 삭제 오류:", error)
    },
  })

  const likeCommentMutation = useMutation({
    ...commentMutations.likeMutation(),
    onSuccess(_, { id: commentId, likes }) {
      if (!selectedPost) return

      queryClient.setQueryData<{ comments: Comment[] }>(commentQueries.byPost(selectedPost.id), (prev) => {
        if (!prev) return { comments: [] }

        const updatedComments = prev.comments.find((comment) => comment.id === commentId)

        if (!updatedComments) return prev

        return {
          comments: [...prev.comments.filter((comment) => comment.id !== commentId), { ...updatedComments, likes }],
        }
      })

      resetSelectedComment()
    },
    onError: (error) => {
      console.error("댓글 좋아요 오류:", error)
    },
  })

  const posts = searchQuery ? searchResults?.posts : selectedTag ? listByTag?.posts : list?.posts

  const total = (searchQuery ? searchResults?.total : selectedTag ? listByTag?.total : list?.total) ?? 0

  const isPostsLoading = isListLoading || isTagLoading || isSearchLoading

  const postsWithUsers = useMemo(() => {
    if (!posts || !users) return []

    return posts.map((post) => {
      return {
        ...post,
        author: users.find((user) => user.id === post.userId),
      }
    })
  }, [posts, users])

  // 게시물 삭제
  const deletePost = async (id: number) => {
    await deletePostMutation.mutateAsync(id)
  }

  const { onOpen } = useToggleState<ToggleKey>()
  const { handleViewProfile, user } = useViewUserProfile()

  const { formData, handleChange, handleSubmit: submitAddPost, isSubmitting: isAddSubmitting } = useAddPostModal()

  const {
    post: editingPost,
    handleEdit,
    handleChange: handleEditChange,
    handleSubmit: submitEditPost,
    isSubmitting: isEditSubmitting,
  } = useEditPostModal()

  const { post: selectedPost, comments, handleView: handleViewDetail } = useDetailPostModal()

  const {
    body: newAddCommentBody,
    handleChange: handleChangeAddCommentBody,
    handleSubmit: submitAddComment,
    isSubmitting: isAddCommentSubmitting,
  } = useAddCommentModal(selectedPost?.id)

  const {
    body: newEditCommentBody,
    handleChange: handleChangeEditCommentBody,
    handleSubmit: submitEditComment,
    isSubmitting: isEditCommentSubmitting,
    selectComment: selectEditComment,
  } = useEditCommentModal(selectedPost?.id)

  return (
    <Card className="w-full max-w-6xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>게시물 관리자</span>
          <Button onClick={() => onOpen("addPost")}>
            <Plus className="w-4 h-4 mr-2" />
            게시물 추가
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          {/* 검색 및 필터 컨트롤 */}
          <div className="flex gap-4">
            <div className="flex-1">
              <SearchPostForm searchQuery={searchQuery} onSearch={searchPosts} />
            </div>
            <TagFilter selectedTag={selectedTag} tags={tags} onTagChange={handleTagChange} />
            <SortControls
              sortBy={sortBy}
              sortOrder={sortOrder}
              onSortByChange={handleSortByChange}
              onSortOrderChange={handleSortOrderChange}
            />
          </div>

          {/* 게시물 테이블 */}
          {isPostsLoading ? (
            <LoadingIndicator />
          ) : (
            <PostsTable
              posts={postsWithUsers}
              onViewDetail={(id) => handleViewDetail(id)}
              onClickProfile={handleViewProfile}
              onEdit={handleEdit}
              onDelete={deletePost}
              searchQuery={searchQuery}
              selectedTag={selectedTag}
            />
          )}

          <Pagination
            page={page}
            pageSize={pageSize}
            total={total}
            onPageChange={onPageChange}
            onPageSizeChange={onPageSizeChange}
          />
        </div>
      </CardContent>

      <UserProfileModal user={user} />
      <PostAddModal
        formData={formData}
        onChange={handleChange}
        onSubmit={submitAddPost}
        isSubmitting={isAddSubmitting}
      />
      <PostEditModal
        post={editingPost}
        onChange={handleEditChange}
        onSubmit={submitEditPost}
        isSubmitting={isEditSubmitting}
      />
      <PostDetailModal
        post={selectedPost}
        searchQuery={searchQuery}
        CommentList={() => {
          if (!selectedPost) return null
          return (
            <CommentList
              comments={comments || []}
              postId={selectedPost?.id}
              addComment={() => onOpen("addComment")}
              editComment={(comment) => {
                selectEditComment(comment)
                onOpen("editComment")
              }}
              deleteComment={(comment) => deleteCommentMutation.mutateAsync(comment.id)}
              increaseLike={(comment) => likeCommentMutation.mutateAsync({ id: comment.id, likes: comment.likes + 1 })}
              searchQuery={searchQuery}
            />
          )
        }}
      />

      <CommentAddModal
        body={newAddCommentBody}
        onChange={handleChangeAddCommentBody}
        onSubmit={submitAddComment}
        isSubmitting={isAddCommentSubmitting}
      />

      <CommentEditModal
        body={newEditCommentBody}
        onChange={handleChangeEditCommentBody}
        onSubmit={submitEditComment}
        isSubmitting={isEditCommentSubmitting}
      />
    </Card>
  )
}
