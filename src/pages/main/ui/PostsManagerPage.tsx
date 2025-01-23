import { useMutation, useQuery } from "@tanstack/react-query"
import { Plus, Search } from "lucide-react"
import { useMemo, useState } from "react"
import { useLocation } from "react-router-dom"

import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../shared/ui"
import { useQueryParams } from "../../../shared/lib"

import { Comment } from "../../../entities/comment/model"
import { postMutations, postQueries } from "../../../entities/post/api"
import { SortOrder } from "../../../entities/post/model"
import { userQueries } from "../../../entities/user/api"

import { useAddCommentModal, CommentAddModal } from "../../../features/comment/add-comment"
import { useEditCommentModal, CommentEditModal } from "../../../features/comment/edit-comment"
import { useAddPostModal, PostAddModal } from "../../../features/post/add-post"
import { useEditPostModal, PostEditModal } from "../../../features/post/edit-post"
import { useDetailPostModal, PostDetailModal } from "../../../features/post/view-post-detail"
import { useViewUserProfile, UserProfileModal } from "../../../features/user/view-user-profile"

import { usePagination } from "../../../widgets/pagination/model"
import { Pagination } from "../../../widgets/pagination/ui"
import { PostsTable } from "../../../widgets/posts-table/ui"

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

  const { data: searchResults, isLoading: isSearchLoading } = useQuery({
    ...postQueries.searchQuery({
      limit,
      skip,
      sortBy,
      order: sortOrder as SortOrder,
      search: searchQuery,
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

  const { data: tags = [] } = useQuery({
    ...postQueries.tagQuery(),
  })

  const deletePostMutation = useMutation({
    ...postMutations.deleteMutation(),
    onError: (error) => {
      console.error("게시물 삭제 오류:", error)
    },
  })

  // 댓글 삭제
  const deleteComment = async (id, postId) => {
    try {
      await fetch(`/api/comments/${id}`, {
        method: "DELETE",
      })
      setSelectedComment(null)
    } catch (error) {
      console.error("댓글 삭제 오류:", error)
    }
  }

  // 댓글 좋아요
  const likeComment = async (id, postId) => {
    try {
      const response = await fetch(`/api/comments/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ likes: comments.find((c) => c.id === id).likes + 1 }),
      })
      const data = await response.json()
      setSelectedComment({ ...selectedComment, likes: data.likes + 1 })
    } catch (error) {
      console.error("댓글 좋아요 오류:", error)
    }
  }

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

  // 게시물 검색
  const searchPosts = (value: string) => {
    updateURLParams({
      search: value || null,
      skip: "0",
    })
  }

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
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="게시물 검색..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => searchPosts(e.target.value)}
                />
              </div>
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
            <div className="flex justify-center p-4">로딩 중...</div>
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
        comments={comments ?? []}
        searchQuery={searchQuery}
        onClickAddButton={() => openAddCommentModal()}
        onClickEditButton={(id, body) => {
          selectEditComment(id, body)
          openEditCommentModal()
        }}
        onClickDeleteButton={(id, postId) => deleteComment(id, postId)}
        onClickLikeButton={(id, postId) => likeComment(id, postId)}
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
