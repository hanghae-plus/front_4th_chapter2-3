import { useState } from "react"
import { Plus } from "lucide-react"
import { Button, Card, CardContent, CardHeader, CardTitle } from "../shared/ui/index"
import { PostTable } from "../components/PostTable"
import { Pagination } from "../components/Pagination"
import { PostAddDialog } from "../components/PostAddDialog"
import { PostUpdateDialog } from "../components/PostUpdateDialog"
import { CommentAddDialog } from "../components/CommentAddDialog"
import { CommentUpdateDialog } from "../components/CommentUpdateDialog"
import { PostDetailDialog } from "../components/PostDetailDialog"
import { UserModal } from "../components/UserModal"
import { FilterableSearch } from "../components/FilterableSearch"
import { usePosts } from "../hooks/usePosts"
import { useParams } from "../hooks/useParams"
import { useTags } from "../hooks/useTags"
import { PostWithUser } from "../types/post"
import { User } from "../types/user"
import { Comment } from "../types/comment"
import { useDialogStore } from "../store/dialog"

const PostsManager = () => {
  // 상태 관리
  const {
    limit,
    selectedTag,
    skip,
    sortBy,
    sortOrder,
    searchQuery,
    onChangeLimit,
    onChangeSkip,
    onSelectTag,
    onChangeSearchQuery,
    onChangeSortBy,
    onChangeSortOrder,
    updateURL,
  } = useParams()

  const { tags } = useTags()

  const { posts, loading, total } = usePosts({ selectedTag, skip, limit, sortBy, sortOrder, searchQuery })

  const [comments, setComments] = useState({})

  const [selectedPost, setSelectedPost] = useState<PostWithUser | null>(null)
  const [selectedComment, setSelectedComment] = useState<Comment | null>(null)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)

  const { onOpenChange } = useDialogStore()

  return (
    <Card className="w-full max-w-6xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>게시물 관리자</span>
          <Button onClick={() => onOpenChange("addPostDialog", true)}>
            <Plus className="w-4 h-4 mr-2" />
            게시물 추가
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <FilterableSearch
            sortBy={sortBy}
            sortOrder={sortOrder}
            tags={tags}
            selectedTag={selectedTag}
            searchQuery={searchQuery}
            onSelectTag={onSelectTag}
            onChangeSortBy={onChangeSortBy}
            onChangeSearchQuery={onChangeSearchQuery}
            onChangeSortOrder={onChangeSortOrder}
            updateURL={updateURL}
          />
          {loading ? (
            <div className="flex justify-center p-4">로딩 중...</div>
          ) : (
            <PostTable
              posts={posts}
              onSelectPost={setSelectedPost}
              onSelectUser={setSelectedUser}
              onSelectTag={onSelectTag}
              selectedTag={selectedTag}
              searchQuery={searchQuery}
              updateURL={updateURL}
            />
          )}
          <Pagination
            skip={skip}
            total={total}
            limit={limit}
            onChangeLimit={onChangeLimit}
            onChangeSkip={onChangeSkip}
          />
        </div>
      </CardContent>
      <PostAddDialog />
      <PostUpdateDialog selectedPost={selectedPost} onSelectPost={setSelectedPost} />
      <CommentAddDialog postId={selectedPost?.id} />
      <CommentUpdateDialog selectedComment={selectedComment} onSelectComment={setSelectedComment} />
      <PostDetailDialog selectedPost={selectedPost} onSelectComment={setSelectedComment} searchQuery={searchQuery} />
      <UserModal selectedUser={selectedUser} />
    </Card>
  )
}

export default PostsManager

// todo: hooks로 분리할 수 있는 거 다 분리
// todo: 위에서 분리한 거 전역 상태로 끌어올리기
// todo: tanstack + typescript 제대로 적용
// todo: fsd식 파일 분리
