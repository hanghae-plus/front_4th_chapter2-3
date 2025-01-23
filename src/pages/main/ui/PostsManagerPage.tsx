import { useMutation, useQuery } from "@tanstack/react-query"
import { Plus } from "lucide-react"
import { useMemo } from "react"
import { useLocation } from "react-router-dom"

import { useQueryParams } from "../../../shared/lib"
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  LoadingIndicator,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../shared/ui"

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
import { queryClient } from "../../../shared/api"
import { usePagination } from "../../../widgets/pagination/model"
import { Pagination } from "../../../widgets/pagination/ui"
import { PostsTable } from "../../../widgets/posts-table/ui"
import { CommentList } from "../../../entities/comment/ui"
import { useSearchPost, SearchPostForm } from "../../../features/post/search-post"

export const PostsManagerPage = () => {
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)

  // 상태 관리
  const skip = useMemo(() => parseInt(queryParams.get("skip") || "0"), [location.search])
  const limit = useMemo(() => parseInt(queryParams.get("limit") || "10"), [location.search])
  const searchQuery = queryParams.get("search") || ""
  const sortBy = queryParams.get("sortBy") || ""
  const sortOrder = (queryParams.get("sortOrder") || "asc") as SortOrder
  const selectedTag = queryParams.get("tag") || ""

  const { page, pageSize, onPageChange, onPageSizeChange } = usePagination()

  const { updateURLParams } = useQueryParams()
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

  const { data: listByTag, isLoading: isTagLoading } = useQuery({
    ...postQueries.listByTagQuery({
      limit,
      skip,
      sortBy,
      order: sortOrder as SortOrder,
      tag: selectedTag,
    }),
    select: (data) => ({
      posts: data.posts,
      total: data.total,
    }),
    enabled: !!selectedTag,
  })

  const { data: { users } = { users: [] } } = useQuery({
    ...userQueries.listQuery(),
    select: (data) => ({
      users: data.users,
    }),
  })

  const { data: tags = [] } = useQuery({
    ...postQueries.tagQuery(),
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

  const { isOpen, handleViewProfile, handleClose, user } = useViewUserProfile()

  const {
    isOpen: isAddOpen,
    formData,
    handleChange,
    handleOpen: openAddPost,
    handleClose: closeAddPost,
    handleSubmit: submitAddPost,
    isSubmitting: isAddSubmitting,
  } = useAddPostModal()

  const {
    isOpen: isEditOpen,
    post: editingPost,
    handleEdit,
    handleClose: closeEditPost,
    handleChange: handleEditChange,
    handleSubmit: submitEditPost,
    isSubmitting: isEditSubmitting,
  } = useEditPostModal()

  const {
    isOpen: isDetailOpen,
    post: selectedPost,
    comments,
    handleView: handleViewDetail,
    handleClose: closeDetail,
  } = useDetailPostModal()

  const {
    isOpen: isAddCommentModalOpen,
    body: newAddCommentBody,
    handleOpen: openAddCommentModal,
    handleClose: closeAddCommentModal,
    handleChange: handleChangeAddCommentBody,
    handleSubmit: submitAddComment,
    isSubmitting: isAddCommentSubmitting,
  } = useAddCommentModal(selectedPost?.id)

  const {
    isOpen: isEditCommentModalOpen,
    body: newEditCommentBody,
    handleOpen: openEditCommentModal,
    handleClose: closeEditCommentModal,
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
          <Button onClick={openAddPost}>
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
            <Select
              value={selectedTag}
              onValueChange={(value) =>
                updateURLParams({
                  tag: value === "all" ? null : value,
                  skip: "0",
                })
              }
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="태그 선택" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">모든 태그</SelectItem>
                {tags?.map((tag) => (
                  <SelectItem key={tag.url} value={tag.slug}>
                    {tag.slug}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={(value) => updateURLParams({ sortBy: value || null })}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="정렬 기준" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">없음</SelectItem>
                <SelectItem value="id">ID</SelectItem>
                <SelectItem value="title">제목</SelectItem>
                <SelectItem value="reactions">반응</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sortOrder} onValueChange={(value) => updateURLParams({ sortOrder: value })}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="정렬 순서" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="asc">오름차순</SelectItem>
                <SelectItem value="desc">내림차순</SelectItem>
              </SelectContent>
            </Select>
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

      <UserProfileModal isOpen={isOpen} onClose={handleClose} user={user} />
      <PostAddModal
        isOpen={isAddOpen}
        onClose={closeAddPost}
        formData={formData}
        onChange={handleChange}
        onSubmit={submitAddPost}
        isSubmitting={isAddSubmitting}
      />
      <PostEditModal
        isOpen={isEditOpen}
        onClose={closeEditPost}
        post={editingPost}
        onChange={handleEditChange}
        onSubmit={submitEditPost}
        isSubmitting={isEditSubmitting}
      />
      <PostDetailModal
        isOpen={isDetailOpen}
        onClose={closeDetail}
        post={selectedPost}
        searchQuery={searchQuery}
        CommentList={() => {
          if (!selectedPost) return null
          return (
            <CommentList
              comments={comments || []}
              postId={selectedPost?.id}
              addComment={() => openAddCommentModal()}
              editComment={(comment) => {
                selectEditComment(comment)
                openEditCommentModal()
              }}
              deleteComment={(comment) => deleteCommentMutation.mutateAsync(comment.id)}
              increaseLike={(comment) => likeCommentMutation.mutateAsync({ id: comment.id, likes: comment.likes + 1 })}
              searchQuery={searchQuery}
            />
          )
        }}
      />

      <CommentAddModal
        isOpen={isAddCommentModalOpen}
        onClose={closeAddCommentModal}
        body={newAddCommentBody}
        onChange={handleChangeAddCommentBody}
        onSubmit={submitAddComment}
        isSubmitting={isAddCommentSubmitting}
      />

      <CommentEditModal
        isOpen={isEditCommentModalOpen}
        onClose={closeEditCommentModal}
        body={newEditCommentBody}
        onChange={handleChangeEditCommentBody}
        onSubmit={submitEditComment}
        isSubmitting={isEditCommentSubmitting}
      />
    </Card>
  )
}
