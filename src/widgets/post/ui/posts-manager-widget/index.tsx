import { Plus } from "lucide-react"
import { Card, Button, LoadingSpinner, Pagination } from "@shared/ui"
import { PostsTable, PostsSearchFilter } from "@widgets/post/ui"
import { usePostManager } from "@features/post/model/hooks"
import { useUserManager } from "@features/user/model/hooks"

export const PostsManagerWidget = () => {
  const {
    loading,
    posts,
    total,
    skip,
    limit,
    searchQuery,
    selectedTag,
    tags,
    sortBy,
    sortOrder,
    setSearchQuery,
    searchPosts,
    setSelectedTag,
    setSortBy,
    setSortOrder,
    setLimit,
    setSkip,
    handleAddPost,
    handleEditPost,
    deletePost,
    openPostDetail,
  } = usePostManager()

  const { handleUserClick } = useUserManager()

  return (
    <Card>
      <Card.Header>
        <Card.Title className="flex items-center justify-between">
          <span>게시물 관리자</span>
          <Button onClick={handleAddPost}>
            <Plus className="w-4 h-4 mr-2" />
            게시물 추가
          </Button>
        </Card.Title>
      </Card.Header>
      <Card.Content>
        <div className="flex flex-col gap-4">
          <PostsSearchFilter
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onSearch={searchPosts}
            selectedTag={selectedTag}
            tags={tags || []}
            onTagChange={setSelectedTag}
            sortBy={sortBy}
            onSortByChange={setSortBy}
            sortOrder={sortOrder}
            onSortOrderChange={setSortOrder}
          />

          {loading ? (
            <LoadingSpinner />
          ) : (
            <PostsTable
              posts={posts || []}
              onEdit={handleEditPost}
              onDelete={deletePost}
              onViewComments={openPostDetail}
              onUserClick={handleUserClick}
            />
          )}

          <Pagination
            skip={skip}
            limit={limit}
            total={total}
            onLimitChange={setLimit}
            onPrevPage={() => setSkip(Math.max(0, skip - limit))}
            onNextPage={() => setSkip(skip + limit)}
          />
        </div>
      </Card.Content>
    </Card>
  )
}
