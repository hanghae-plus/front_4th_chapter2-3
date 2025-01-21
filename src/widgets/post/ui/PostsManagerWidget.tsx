import { Card, Button, LoadingSpinner, Pagination } from "@shared/ui"
import { Plus } from "lucide-react"
import { Post, PostTag } from "@entities/post/model"
import { User } from "@entities/user/model"
import { PostsTable } from "./PostsTable"
import { PostsSearchFilter } from "@widgets/post/ui"

interface PostsManageProps {
  loading: boolean
  posts: Post[]
  total: number
  skip: number
  limit: number
  searchQuery: string
  selectedTag: string
  tags: PostTag[]
  sortBy: string
  sortOrder: string
  onAddClick: () => void
  onEditPost: (post: Post) => void
  onDeletePost: (id: number) => void
  onViewComments: (post: Post) => void
  onUserClick: (user: User | undefined) => void
  onSearchChange: (value: string) => void
  onSearch: () => void
  onTagChange: (tag: string) => void
  onSortByChange: (value: string) => void
  onSortOrderChange: (value: string) => void
  onLimitChange: (limit: number) => void
  onPrevPage: () => void
  onNextPage: () => void
}

export const PostsManagerWidget = ({
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
  onAddClick,
  onEditPost,
  onDeletePost,
  onViewComments,
  onUserClick,
  onSearchChange,
  onSearch,
  onTagChange,
  onSortByChange,
  onSortOrderChange,
  onLimitChange,
  onPrevPage,
  onNextPage,
}: PostsManageProps) => {
  return (
    <Card>
      <Card.Header>
        <Card.Title className="flex items-center justify-between">
          <span>게시물 관리자</span>
          <Button onClick={onAddClick}>
            <Plus className="w-4 h-4 mr-2" />
            게시물 추가
          </Button>
        </Card.Title>
      </Card.Header>
      <Card.Content>
        <div className="flex flex-col gap-4">
          <PostsSearchFilter
            searchQuery={searchQuery}
            onSearchChange={onSearchChange}
            onSearch={onSearch}
            selectedTag={selectedTag}
            tags={tags}
            onTagChange={onTagChange}
            sortBy={sortBy}
            onSortByChange={onSortByChange}
            sortOrder={sortOrder}
            onSortOrderChange={onSortOrderChange}
          />

          {loading ? (
            <LoadingSpinner />
          ) : (
            <PostsTable
              posts={posts}
              onEdit={onEditPost}
              onDelete={onDeletePost}
              onViewComments={onViewComments}
              onUserClick={onUserClick}
            />
          )}

          <Pagination
            skip={skip}
            limit={limit}
            total={total}
            onLimitChange={onLimitChange}
            onPrevPage={onPrevPage}
            onNextPage={onNextPage}
          />
        </div>
      </Card.Content>
    </Card>
  )
}
